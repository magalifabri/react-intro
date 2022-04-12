import React, {useState} from 'react';
import {useRef} from "react";

const Notes = () => {
    const titleRef = useRef();
    const textareaRef = useRef();
    const [notes, setNotes] = useState([]);
    const [idCounter, setIdCounter] = useState(0);


    // get notes from LS
    // save notes to LS


    const handleAddNote = () => {
        const noteTitle = titleRef.current.value;
        const noteBody = textareaRef.current.value;

        setNotes(prevState => {
            return [...prevState, {
                id: idCounter,
                title: noteTitle,
                body: noteBody
            }];
        });

        setIdCounter(prevState => prevState + 1);
    }


    return (
        <main>
            <h1>Notes</h1>
            <ul>
                {notes.map(note => {
                    return <li>{note.title}</li>
                })}
            </ul>

            <label htmlFor="title">title</label>
            <br/>
            <input ref={titleRef} id="title" type="text"/>
            <br/>
            <br/>
            <textarea id="body" ref={textareaRef} cols="30" rows="10"></textarea>
            <br/>
            <br/>
            <button onClick={handleAddNote}>+</button>
        </main>
    );
};

export default Notes;
