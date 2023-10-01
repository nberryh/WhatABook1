/**
	Title: spaceCadets-whatABooks.js
    Author: Danielle Taplin, Nolan Berryhill
    Date: 01 October 2023
    Description: Script for WhatABook
 */

// Import the MongoDB driver
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://whatabook_admin:s3cret@cluster0.wmphxtw.mongodb.net/';
const dbName = 'WhatABook';

// Create a new MongoClient instance
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to initialize the database
async function initDatabase() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        const db = client.db(dbName);

        // Check if collections exist before dropping
        const collections = await db.listCollections().toArray();
        const existingCollections = collections.map((collection) => collection.name);

        if (existingCollections.includes('books')) {
            await db.dropCollection('books').drop();
        }

        if (existingCollections.includes('customers')) {
            await db.dropCollection('customers').drop();
        }

        if (existingCollections.includes('wishlistitems')) {
            await db.dropCollection('wishlistitems').drop();
        }

        // Drop existing collections
        await db.dropCollection('books');
        await db.dropCollection('customers');
        await db.dropCollection('wishlistitems');

        // Create collections
        const booksCollection = db.collection('books');
        const customersCollection = db.collection('customers');
        const wishlistItemsCollection = db.collection('wishlistitems');

        // Create the "User" collection
        const userCollection = db.collection('User');

        // Insert data into collections
        await booksCollection.insertMany(booksData);
        await customersCollection.insertMany(customersData);
        await wishlistItemsCollection.insertMany(wishlistItemsData);

        console.log('Database initialized.');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        client.close();
    }
};

// Book list
const booksData = [
    { bookId: 's1001', title: 'The Lincoln Lawyer', genre: 'Mystery', author: 'Micheal Connelly' },
    { bookId: 's1002', title: 'Foreign Deceit', genre: 'Mystery', author: 'Jeff Carson' },
    { bookId: 's1003', title: 'Red Knife', genre: 'Mystery', author: 'William Krueger' },
    { bookId: 's1004', title: 'The Wager: A Tale of Shipwreck', genre: 'Mystery', author: 'David Grann' },
    { bookId: 's1005', title: 'Way of the Wolf', genre: 'Fantasy', author: 'E. Knight' },
    { bookId: 's1006', title: 'Death Masks', genre: 'Fantasy', author: 'Jim Butcher' },
    { bookId: 's1007', title: 'Apocalyptic Space', genre: 'Fantasy', author: 'Stephen Lee' },
    { bookId: 's1008', title: 'Scion of Conquered Earth', genre: 'Fantasy', author: 'Micheal Allen' },
    { bookId: 's1009', title: 'Twenty Years Later', genre: 'Thriller', author: 'Charlie Donlea' },
    { bookId: 's1010', title: 'Legacy of Lies', genre: 'Thriller', author: 'Robert Bailey' },
    { bookId: 's1011', title: 'One by One', genre: 'Thriller', author: 'Freida Mcfadden' },
    { bookId: 's1012', title: 'The family across the street', genre: 'Thriller', author: 'Nicole Trope' }
];

// Customer information
const customersData = [
    { customerId: 'c1007', firstName: 'Olivia', lastName: 'Thompson' },
    { customerId: 'c1008', firstName: 'Mark', lastName: 'Anderson' },
    { customerId: 'c1009', firstName: 'Bob', lastName: 'Builder' },
];

// Wish list for customer
const wishlistItemsData = [
    { customerId: 'c1007', bookId: ['s1009', 's1010', 's1011', 's1012'] },
    { customerId: 'c1008', bookId: ['s1005', 's1006', 's1007', 's1008'] },
    { customerId: 'c1009', bookId: ['s1001', 's1002', 's1003', 's1004'] },
];

// Call the initDatabase function with the client
initDatabase();