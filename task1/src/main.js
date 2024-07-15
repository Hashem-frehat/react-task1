import React, { useEffect, useState } from "react";
import "./index.css";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

function Main() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://fire-base-e5ddc-default-rtdb.europe-west1.firebasedatabase.app/books.json"
        );
        const data = response.data
          ? Object.keys(response.data).map((key) => ({
              id: key,
              ...response.data[key],
            }))
          : [];
        setBooks(data.filter((el) => el.delete === false));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const addBook = async (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
      isbn,
      delete: false,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        "https://fire-base-e5ddc-default-rtdb.europe-west1.firebasedatabase.app/books.json",
        newBook
      );
      setBooks([...books, { id: response.data.name, ...newBook }]);
      setTitle("");
      setAuthor("");
      setIsbn("");
    } catch (error) {
      console.error("Error adding book:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.patch(
        `https://fire-base-e5ddc-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
        { delete: true }
      );
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const editBook = async (id) => {
    const updatetitle = prompt("Enter new title");
    const updateauthor = prompt("Enter new author");
    const updateisbn = prompt("Enter new isbn");
    if (updatetitle && updateauthor && updateisbn) {
      try {
        const updatedBook = {
          title: updatetitle,
          author: updateauthor,
          isbn: updateisbn,
          delete: false,
        };
        await axios.put(
          `https://fire-base-e5ddc-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
          updatedBook
        );
        setBooks(
          books.map((book) => (book.id === id ? { id, ...updatedBook } : book))
        );
      } catch (error) {
        console.error("Error updating book:", error);
      }
    }
  };

  const itemsPerPage = 5;
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {currentItems.map((ele, index) => (
        <section
          key={index}
          className="flex flex-row justify-center items-center text-center width-200px p-8 bg-gray-100 text-gray-800 my-2"
        >
          <h1 className="text-2xl font-bold">{ele.title}</h1>
          <p className="text-lg">{ele.author}</p>
          <p className="text-md">{ele.isbn}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => editBook(ele.id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
            onClick={() => deleteBook(ele.id)}
          >
            Delete
          </button>
        </section>
      ))}
      <Pagination
        count={Math.ceil(books.length / itemsPerPage)}
        onChange={handleChangePage}
        color="primary"
        page={currentPage}
        className="flex justify-center"
      />
      <br />

      <form onSubmit={addBook} className="flex flex-col space-y-4 mt-8">
        <label className="flex flex-col">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="flex flex-col">
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="flex flex-col">
          ISBN:
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"
          />
        </label>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded mt-4"
          type="submit"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default Main;
