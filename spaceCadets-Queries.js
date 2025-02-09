/**
	Title: spaceCadets-Queries.js
    Author: Danielle Taplin, Nolan Berryhill
    Date: 08 October 2023
    Description: Queries for WhatABook
 */

const MongoClient = require('mongodb').MongoClient;

// Connection url 
const url = 'mongodb+srv://WhatABook_user:s3cret@whatabook.0pwpong.mongodb.net/';

// Connect to the MongoDB server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to MongDB:', err);
        return;
    }

    // Select the database
    const db = client.db('WhatABook');

    // Display a list of books
    db.collection('books').find().toArray((err, books) => {
        if (err) {
            console.error('Error fetching books:', err);
        } else {
            console.log('List of Books:');
            books.forEach((book) => {
                console.log(`Title: ${book.title}`);
                console.log(`Genre: ${book.genre}`);
                console.log(`Author: ${book.author}`);
                console.log('--------------------------');
            });
        }
    });

    // Display a list of books by Genre
    const genres = ['Mystery', 'Fantasy', 'Thriller'];
    const selectedGenre = 'Fantasy';

    db.collection('books').find({ genre: selectedGenre }).toArray((err, genreBooks) => {
        if (err) {
            console.error('Error fetching books by genre:', err);
        } else {
            console.log(`List of ${selectedGenre} Books:`);
            genreBooks.forEach((book) => {
                console.log(`Title: ${book.title}`);
                console.log(`Author: ${book.author}`);
                console.log('--------------------------');
            });
        }
    });

    // Display a customer's wishlist by customerId
    const customerId = 'c1008';

    db.collection('wishlistitems').findOne({ customerId: customerId}, (err, wishlist) => {
        if (err) {
            console.error('Error fetching wishlist:', err);
        } else {
            if (wishlist) {
                console.log(`Wishlist for Customer ${customerId}:`);
                wishlist.bookId.forEach((bookId) => {
                    db.collection('books').findOne({ bookId: bookId }, (err, book) => {
                        if (err) {
                            console.error('Error fetching book from wishlist:', err);
                        } else {
                            if (book) {
                                console.log(`Title: ${book.title}`);
                                console.log(`Author: ${book.author}`);
                                console.log('--------------------------');
                            } else {
                                console.log(`Book with bookId ${bookId} not found.`);
                            }
                        }
                    });
                });
            } else {
                console.log(`Wishlist for Customer ${customerId} not found.`);
            }
        }
    });

    // Add basic error handling for invalid customerID
    const invalidCustomerId = 'c9999';
    db.collection('wishlistitems').findOne({ customerId: invalidCustomerId}, (err, wishlist) => {
        if (err) {
            console.error('Error fetching wishlist:', err);
        } else {
            if (wishlist) {
                console.log(`Wishlist for Customer ${invalidCustomerId}:`);
                wishlist.bookId.forEach((bookId) => {
                    db.collection('books').findOne({ bookId: bookId }, (err, book) => {
                        if (err) {
                            console.error('Error fetching book from wishlist:', err);
                        } else {
                            if (book) {
                                console.log(`Title: ${book.title}`);
                                console.log(`Author: ${book.author}`);
                                console.log('--------------------------');
                            } else {
                                console.log(`Book with bookId ${bookId} not found.`);
                            }
                        }
                    });
                });
            } else {
                console.log(`Wishlist for Customer ${invalidCustomerId} not found.`);
            }
        }
    });

    // Display a customer's wishlist by customerId        
    db.collection('wishlistitems').findOne({ customerId: customerId}, (err, wishlist) => {
        if (err) {
            console.error('Error fetching wishlist:', err);
        } else {
            if (wishlist) {
                console.log(`Wishlist for Customer ${customerId}:`);
                wishlist.bookId.forEach((bookId) => {
                    db.collection('books').findOne({ bookId: bookId }, (err, book) => {
                        if (err) {
                            console.error('Error fetching book from wishlist:', err);
                        } else {
                            if (book) {
                                console.log(`Title: ${book.title}`);
                                console.log(`Author: ${book.author}`);
                                console.log('--------------------------');
                            } else {
                                console.log(`Book with bookId ${bookId} not found.`);
                            }
                        }
                    });
                });
            } else {
                console.log(`Wishlist for Customer ${invalidCustomerId} not found.`);
            }
        }
    });

    // Add a book to a customer's wishlist
    const customerIdToAdd = 'c1008';
    const bookIdToAdd = 's1013';
        
    db.collection('wishlistitems').updateOne(
        { customerId: customerIdToAdd },
        { $push: { bookId: bookIdToAdd } },
        (err, result) => {
            if (err) {
                console.error('Error adding book to wishlist:', err);
            } else {
                console.log(`Book with bookId ${bookIdToAdd} added to wishlist for Customer ${customerIdToAdd}.`);
            }
        }
    );

    // Remove a book to a customer's wishlist
    const customerIdToRemove = 'c1008';
    const bookIdToRemove = 's1005';
            
    db.collection('wishlistitems').updateOne(
        { customerId: customerIdToRemove },
        { $pull: { bookId: bookIdToRemove } },
        (err, result) => {
            if (err) {
                console.error('Error removing book to wishlist:', err);
            } else {
                    console.log(`Book with bookId ${bookIdToRemove} removed to wishlist for Customer ${customerIdToRemove}.`);
            }
        }
    );

    // Close the MongoDB connection
    client.close();

});
