import React from 'react';

const NoteView = ({note, setMode, handleDeleteNote}) => {
    return (
        <>
            <p className="notes__full-note">
                {note.body}
            </p>

            <div className="button-row">
                <button className="button-style-1"
                        onClick={() => setMode('add')}>
                    add
                </button>

                <button className="button-style-1"
                        onClick={() => setMode('edit')}>
                    edit
                </button>

                <button className="button-style-1"
                        onClick={() => handleDeleteNote(note.id)}>
                    delete
                </button>
            </div>
        </>
    );
};

export default NoteView;
