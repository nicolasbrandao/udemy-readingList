import { useState, useContext } from 'react';
import BooksContext from '../context/books';
import BookEdit from './BookEdit';

function BookShow ({book, onDelete, onEdit}) {
    const [showEdit, setShowEdit] = useState(false);
    const { deleteBookById } = useContext(BooksContext);

    const handleClickEdit = () => {
        setShowEdit(!showEdit);
    };

    const handleClickDelete = () => {
        deleteBookById(book.id);
    };

    const handleSubmit = () => {
        setShowEdit(false);
    }

    let content = <h3>{book.title}</h3>;
    if (showEdit) {
        content = <BookEdit book={book} onSubmit={handleSubmit} />;
    }
    
    return (
        <div className="book-show">
            <img src={`https://picsum.photos/seed/${book.id}/200/300`} alt="books" />
            <div>{content}</div>
            <div className="actions">
                <button className="edit" onClick={handleClickEdit}>
                    Edit
                </button>
                <button className="delete" onClick={handleClickDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default BookShow;