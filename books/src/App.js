import { useEffect, useState } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App () {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

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

    return (
        <div className='app'>
            <h1>Reading List</h1>
            <BookList books={books} onDelete={deleteBookById} onEdit={editBookById}/>
            <BookCreate onCreate={createBook} />
        </div>
    );
};

export default App;