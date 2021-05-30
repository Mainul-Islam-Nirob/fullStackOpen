const { ApolloServer, gql } = require('apollo-server')
require("dotenv").config()
const { v1: uuid } = require("uuid")
const mongoose = require('mongoose')
const Book = require('./models/books')
const Author = require('./models/authors')

const uri = process.env.MONGODB_URI

console.log('connecting to server')

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
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genre)
        )
      } else if (args.author) {
        return books.filter((book) => book.author === args.author)
      } else if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre))
      } else return Book.find({})
    },
    
    allAuthors: () => {
      const booksPerAuthor = authors.map((author) =>
        books.filter((book) => book.author === author.name)
      )
      //***********//
      return booksPerAuthor.map((item) => {
        let author = authors.find((author) => item[0].author === author.name);
        if (author.born) {
          author = {
            bookCount: item.length,
            name: item[0].author,
            born: author.born,
          }
        } else {
          author = { bookCount: item.length, name: item[0].author }
        }

        return Author.find({})
      })
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
        console.log(error)
      }

      return book
    },

    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)
      if (!author) return null;
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) => (a.name === updatedAuthor.name ? updatedAuthor : a))
      return updatedAuthor
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