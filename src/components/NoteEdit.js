import React from 'react';

const NoteEdit = ({
                      note,
                      setMode,
                      handleEditNote,
                      editTextareaRef,
                      handleDeleteNote
                  }) => {
    return (
        <>
            <textarea className="input-wrapper__input"
                      defaultValue={note.body}
                      ref={editTextareaRef}
                      cols="30" rows="10"/>

            <div className="button-row">
                <button className="button-style-1"
                        onClick={() => setMode('add')}>
                    add
                </button>

                <button className="button-style-1"
                        onClick={() => handleEditNote(note.id)}>
                    submit
                </button>

                <button className="button-style-1"
                        onClick={() => handleDeleteNote(note.id)}>
                    delete
                </button>
            </div>
        </>
    );
};

export default NoteEdit;
