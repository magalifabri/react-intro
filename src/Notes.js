import React, {useState, useRef, useEffect} from 'react';

const LOCAL_STORAGE_NOTES_KEY = 'notes';
const LOCAL_STORAGE_ID_COUNTER_KEY = 'idCounter';


const Notes = () => {
    const titleRef = useRef();
    const textareaRef = useRef();
    const [notes, setNotes] = useState([]);
    const [idCounter, setIdCounter] = useState(0);


    // get notes/idCounter from LS
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTES_KEY));
        const storedIdCounter = Number(localStorage.getItem(LOCAL_STORAGE_ID_COUNTER_KEY));

        if (storedNotes && storedNotes.length > 0) {
            setNotes(storedNotes);
        }

        if (storedIdCounter > 0) {
            setIdCounter(storedIdCounter);
        }
    }, []);


    // save notes/idCounter to LS
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, JSON.stringify(notes));
        localStorage.setItem(LOCAL_STORAGE_ID_COUNTER_KEY, String(idCounter));
    }, [notes, idCounter]);


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


    const handleClearAll = () => {
        localStorage.clear();
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
            <br/>
            <br/>
            <button onClick={handleClearAll}>clear all</button>
        </main>
    );
};

export default Notes;
