import React from 'react';

const NoteView = ({titleRef, textareaRef, handleAddNote}) => {
    return (
        <>
            <div className="input-wrapper">
                <label className="input-wrapper__label"
                       htmlFor="title">
                    title (optional)
                </label>
                <input className="input-wrapper__input" id="title"
                       ref={titleRef} type="text"/>
            </div>

            <textarea className="notes__textarea" id="body"
                      ref={textareaRef} cols="30" rows="10"/>

            <button className="button-style-1" onClick={handleAddNote} >
                +
            </button>
        </>
    );
};

export default NoteView;
