import React from 'react';

const NoteView = ({note, setMode}) => {
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
        </>
    );
};

export default NoteView;
