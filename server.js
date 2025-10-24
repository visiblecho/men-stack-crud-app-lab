// ! Imports

// Import frameworks and libraries
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';

// Import the data model.
import Books from './models/books.js'
import { register } from 'module';
import Book from './models/books.js';

// ! Global setup

// Normalize logging.
const log = { success: '☑️ ', warning: '⚠️ ', alert: '🚨 ', info: 'ℹ️ ' };

// Set up Express.
const app = express();
console.log(log.success, 'Server set up');

// Set up EJS.
app.set('view engine', 'ejs')

// ! Middleware

// Use Morgan for logging all requests to the server to the terminal.
app.use(morgan('dev'));

// Use /public/ as folder to serve static assets like CSS files and images.
app.use(express.static('public'));

// Ensure that form data can be interpreted with correct encoding.
app.use(express.urlencoded());

// ! Routes

// Homepage
app.get('/', (req, res) => {
    res.render('index');
})

// Create book
app.get('/books/new', (req, res) => {
    res.render('books/new');
})

app.post('/books', async (req, res) => {
    const submittedBook = req.body;
    const newBook = await Book.create(submittedBook);
    console.log(log.info, `Stored new book ${newBook.titleText} as ${newBook._id}`);
    res.redirect(`/books/${newBook._id}`);
})

// Show book
app.get('/books', async (req, res) => {
    const retrievedBooks = await Book.find().lean();
    console.log(log.info, `Retrieved all books`);
    res.render('books/index', { books: retrievedBooks });
})

app.get('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const retrievedBook = await Book.findById(bookId).lean();
    console.log(log.info, `Retrieved book ${retrievedBook.titleText} as ${retrievedBook._id}`);
    res.render('books/show', { book: retrievedBook });
})

// ! Connections

const connect = async () => {
    const database = process.env.MONGODBURI;
    const port = 3000;
    await mongoose.connect(database);
    console.log(log.success, `Connected to database at ${database}`);
    app.listen(port, () => {
        console.log(log.success, `Server listening on port ${port}`);
    })
}

// ! Starting the appplication

connect();