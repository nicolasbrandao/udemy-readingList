import { createContext, useState } from 'react';
import axios from 'axios';

const BooksContext = createContext();

function Provider ({ children }) {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    };

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title,
        });

        const updatedBooks = [...books, response.data]

        setBooks(updatedBooks);
    };

    const deleteBookById = async (idToBeRemoved) => {
        await axios.delete(`http://localhost:3001/books/${idToBeRemoved}`)

        const updatedBooks = books.filter((book) => {
            return (book.id !== idToBeRemoved);
        });

        setBooks(updatedBooks);
    };

    const editBookById = async (id, title) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title,
        });

        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return {...book, ...response.data};
            }
            return book;
        });

        setBooks(updatedBooks);
    };

    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
    };

    return <BooksContext.Provider value={{ valueToShare }}>{ children }</BooksContext.Provider>    
};

export { Provider };
export default BooksContext;