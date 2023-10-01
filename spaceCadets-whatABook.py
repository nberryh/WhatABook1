#-----------------------------------------------------
# Title: spaceCadets-whatABook.py
# Author: Danielle Taplin, Nolan Berryhill
# Date: 01 October 2023
# Description: Python for WhatABook
#-----------------------------------------------------

import pymongo

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://whatabook_user:s3cret@cluster0.wmphxtw.mongodb.net/")

# Access the "books" collection
db = client.WhatABook
books_collection = db.books

# Display a list of Books
def display_books():
    for book in books_collection.find():
        print(f"Title: {book['title']}, Genre: {book['genre']}, Author: {book['author']}")

def display_books_by_genre():
    # Specify the genre
    genre = input("Enter genre: ")

    # Display a list of books by genre
    for book in books_collection.find({"genre": genre}):
        print(f"Title: {book['title']}, Author: {book['author']}")

def display_books_by_author():
    # Specify the author
    author = input("Enter author: ")

    # Display a list books by author
    for book in books_collection.find({"author": author}):
        print(f"Title: {book['title']}, Genre: {book['genre']}")

def display_book_by_id():
    # Specify the bookId
    book_id = input("Enter bookId: ")

    # Display a book by bookId
    book = books_collection.find_one({"bookId": book_id})
    if book:
        print(f"Title: {book['title']}, Genre: {book['genre']}, Author: {book['author']}")
    else:
        print(f"Book with bookId {book_id} not found.")

#Menu-driven interface
while True:
    print('\nMenu:')
    print("1. Display a list of books")
    print("2. Display a list of books by genre")
    print("3. Display a list of books by author")
    print("4. Display a book by bookId")
    print("5. Exit")

    choice = input("Enter your choice: ")

    if choice == "1":
        display_books()
    elif choice == "2":
        display_books_by_genre()
    elif choice == "3":
        display_books_by_author()
    elif choice == "4":
        display_book_by_id()
    elif choice == "5":
        break
    else:
        print("Invalid choice. Please select a valid option.")

# Close the MongoDB connection
client.close()