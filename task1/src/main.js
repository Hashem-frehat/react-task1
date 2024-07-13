import React, { useEffect, useState } from "react";
import initState from "./json";
import { ref, set, push, get, update } from "firebase/database";
import { database } from "./firebase";

const heroStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "4rem 2rem",
  backgroundColor: "#f5f5f5",
  color: "#333",
  margin: "5px",
};

const buttonStyle = {
  padding: "0.75rem 2rem",
  fontSize: "1rem",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "2rem",
};

function Main() {
  const [alldata, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const writedata = function () {
      initState.books.forEach((ele) => {
        const newDataRef = ref(database, `books/${ele.id}`);
        set(newDataRef, ele);
      });
    };
    writedata();
  }, []); //القوسين الفارغين [] في النهاية تعني أن useEffect سيتم تشغيله مرة واحدة فقط عند تحميل المكون.
  useEffect(() => {
    const datafetch = async () => {
      const dbref = ref(database, "books");

      try {
        const dataget = await get(dbref);
        if (dataget.exists()) {
          const data = dataget.val();
          const books = Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .filter((book) => !book.deleted); // تجاهل الكتب المحذوفة
          setData(books);
        }
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      }
    };
    datafetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const booksRef = ref(database, "books");
      const newBookRef = push(booksRef);
      await set(newBookRef, { title, author, isbn });
      const newBookSnapshot = await get(newBookRef);
      setData([...alldata, { id: newBookSnapshot.key, title, author, isbn }]);
      setTitle("");
      setAuthor("");
      setIsbn("");
    } catch (error) {
      console.error("Error adding book:", error);
    } finally {
      setLoading(false);
    }
  };
  const editcards = async (bookId) => {
    const updatetitle = prompt("enter new title");
    const updateauthor = prompt("enter new author");
    const updateisbn = prompt("enter new isbn");
    if (updatetitle && updateauthor && updateisbn) {
      try {
        const bookRef = ref(database, `books/${bookId}`);
        await update(bookRef, {
          title: updatetitle,
          author: updateauthor,
          isbn: updateisbn,
        });
        const updatedcard = alldata.map((card) =>
          card.id === bookId
            ? {
                ...card,
                title: updatetitle,
                author: updateauthor,
                isbn: updateisbn,
              }
            : card
        );
        setData(updatedcard);
      } catch (error) {
        console.error("Error updating book:", error);
      }
    }
  };
  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const bookRef = ref(database, `books/${bookId}`);
        await update(bookRef, { deleted: true });
        const updatedBooks = alldata.filter((book) => book.id !== bookId);
        setData(updatedBooks);
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  if (!alldata) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {alldata.map((ele, index) => (
        <section key={index} style={heroStyle}>
          <h1>{ele.title}</h1>
          <p>{ele.author}</p>
          <p>{ele.isbn}</p>
          <button onClick={() => editcards(ele.id)}>Edit</button>
          <button onClick={() => handleDelete(ele.id)}>Delete</button>
        </section>
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </label>
        <label>
          ISBN:
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </label>
        <button style={buttonStyle} type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default Main;
