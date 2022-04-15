import React from 'react';

const NoteView = ({textareaRef, handleAddNote}) => {
    return (
        <>
            <textarea className="notes__textarea" id="body"
                      ref={textareaRef} cols="30" rows="10"/>

            <button className="button-style-1" onClick={handleAddNote} >
                add
            </button>
        </>
    );
};

export default NoteView;
