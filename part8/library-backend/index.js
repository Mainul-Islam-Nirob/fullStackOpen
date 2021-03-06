const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
require("dotenv").config()
// const { v1: uuid } = require("uuid")
const DataLoader = require("dataloader")
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const Book = require('./models/books')
const Author = require('./models/authors')
const User = require('./models/user')

const uri = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET

const batchAuthors = async (keys) => {
  const authors = await Author.find({
    _id: {
      $in: keys,
    },
  })

  return keys.map(
    (key) =>
      authors.find((author) => author.id == key) ||
      new Error(`No result for ${key}`)
  )
}

console.log('connecting to server...')

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

mongoose.set('debug', true)

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

   type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    me:(root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
      const author = await Author.findOne({ name: args.author })

      const books = await Book.find({
        $and: [
          { author: { $in: author.id } },
          { genres: { $in: args.genre } },
        ],
      }).populate("author")

      return books
      }else if (args.author) {
        const author = await Author.findOne({ name: args.author })

        const books = await Book.find({ author: { $in: author.id } }).populate(
          "author"
        )
        return books
      }else if (args.genre) {
        const books = await Book.find({ genres: { $in: args.genre } }).populate(
          "author"
        )
        return books
      }else {
        return Book.find({}).populate("author")
      }
    },
    
    allAuthors: async () => {
      const authors = await Author.find({})

      // let booksPerAuthor = authors.map(async (author) => {
      //   const result = await Book.find({
      //     author: { $in: author._id },
      //   }).populate("author")

      const authorsObject = authors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.books.length,
          id: author.id,
        }
      })

      // booksPerAuthor = await Promise.all(booksPerAuthor)

      return authorsObject
    },
  },

  Book: {
    author: async (root, args, { loaders }) => {
      const id = root.author

      // const bookCount = await Book.find({ author: { $in: id } })
      //   .populate("author")
      //   .countDocuments()

      // const author = await Author.findById(id)

      // if (!author) return

      const author = await loaders.author.load(root.author._id)

      return {
        name: author.name,
        born: author.born,
        bookCount: author.books.length,
        id: root.author._id
      }
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secred") {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

    addBook: async (root, args, context) => {
      let book
      try {
        // Check if book author is already in db:
        let author = await Author.findOne({ name: args.author })

        const currentUser = context.currentUser

        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        if (author) {
          book = new Book({ ...args, author: author._id })
          author.books = author.books.concat(book._id)

          await book.save()
          await author.save()
        }

        if (!author) {
          const _id = mongoose.Types.ObjectId()
          book = new Book({ ...args, author: _id })

          author = new Author({
            name: args.author,
            born: null,
            bookCount: 1,
            // id: uuid(),
            _id,
            books: [book._id],
          })

          // book = new Book({ ...args, author: author.id })
          await author.save()
          await book.save()
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      if (!author) return null
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return {
        currentUser,
        loaders: {
          author: new DataLoader((keys) => batchAuthors(keys)),
    },
  }
}
    return {
      loaders: {
        author: new DataLoader((keys) => batchAuthors(keys)),
      },
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})