import mongoose from "mongoose";

// Define a schema as subset of ONIX (https://www.editeur.org/83/overview/).
const bookSchema = new mongoose.Schema({
    personName: { type: String, required: true }, // author
    titleText: { type: String, required: true }, // main title
    cityOfPublication: { type: String },
    publishingDate: { type: Number } // year
})

// Create a model from the schema.
const Book = new mongoose.model('Book', bookSchema);

// Export the model for use on the server.
export default Book;