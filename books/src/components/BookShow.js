import { useState } from 'react';
import BookEdit from './BookEdit';

function BookShow ({book, onDelete, onEdit}) {
    const [showEdit, setShowEdit] = useState(false);

    const handleClickEdit = () => {
        setShowEdit(!showEdit);
    };

    const handleClickDelete = () => {
        onDelete(book.id);
    };

    const handleSubmit = (id, title) => {
        onEdit(id, title);
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