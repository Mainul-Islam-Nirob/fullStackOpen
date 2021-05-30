const { ApolloServer, gql, UserInputError } = require('apollo-server')
require("dotenv").config()
const { v1: uuid } = require("uuid")
const mongoose = require('mongoose')
const Book = require('./models/books')
const Author = require('./models/authors')

const uri = process.env.MONGODB_URI

console.log('connecting to server...')

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
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
  }
`

const resolvers = {
  Query: {
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

      let booksPerAuthor = authors.map(async (author) => {
        const result = await Book.find({
          author: { $in: author._id },
        }).populate("author")

        const authorObject = {
          name: author.name,
          born: author.born,
          bookCount: result.length,
        }
        return authorObject
      })

      booksPerAuthor = await Promise.all(booksPerAuthor)

      return booksPerAuthor
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      let book
      try {
        // Check if book author is already in db:
        let author = await Author.findOne({ name: args.author })

        if (author) {
          book = new Book({ ...args, author: author._id })
          await book.save()
        }

        if (!author) {
          author = new Author({
            name: args.author,
            born: null,
            bookCount: 1,
            id: uuid(),
          })

          book = new Book({ ...args, author: author.id })
          await author.save()
          await book.save()
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      
      author.born = args.setBornTo

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})