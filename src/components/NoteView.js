import React from 'react';

const NoteView = ({note, setMode, handleDeleteNote}) => {
    return (
        <>
            {note.body}

            <button className="button-style-1"
                    onClick={() => setMode('add')}>
                close
            </button>

            <button className="button-style-1"
                    onClick={() => setMode('edit')}>
                edit
            </button>

            <button className="button-style-1"
                    onClick={() => handleDeleteNote(note.id)}>
                delete
            </button>
        </>
    );
};

export default NoteView;
