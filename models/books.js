import mongoose from "mongoose";

// Define a schema as subset of ONIX (https://www.editeur.org/83/overview/).
const bookSchema = new mongoose.Schema({
    idValue: { type: String, required: true }, // ISBN etc. 
    personName: { type: String, required: true }, // author
    titleText: { type: String, required: true }, // main title
    subtitle: { type: String },
    partNumber: { type: String}, 
    publisherName: { type: String, required: true },
    cityOfPublication: { type: String },
    publishingDate: { type: Date },
    editionNumber: { type: Number },
    priceAmount: { type: Number },
    currencyCode: { type: String, default: "EUR" },
    territory: { type: String, default: "Germany" },
    language: { type: String, default: "German" },
    pages: { type: Number }
})

// Create a model from the schema.
const Book = new mongoose.model('Book', bookSchema);

// Export the model for use on the server.
export default Book;