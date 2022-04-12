import React, {useState, useRef, useEffect} from 'react';

const LOCAL_STORAGE_NOTES_KEY = 'notes';
const LOCAL_STORAGE_ID_COUNTER_KEY = 'idCounter';


const Notes = () => {
    const titleRef = useRef();
    const textareaRef = useRef();
    const [notes, setNotes] = useState([]);
    const [idCounter, setIdCounter] = useState(0);
    const [noteBody, setNoteBody] = useState('');


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
        let titleInput = titleRef.current.value;
        const textareaInput = textareaRef.current.value;

        if (!titleInput) {
            titleInput = textareaInput.slice(0, 25) + '...';
        }

        setNotes(prevState => {
            return [...prevState, {
                id: idCounter,
                title: titleInput,
                body: textareaInput
            }];
        });

        setIdCounter(prevState => prevState + 1);
    }


    const handleClearAll = () => {
        localStorage.clear();
    }


    const handleShowNote = (event) => {
        const noteId = event.target.id
        const note = notes.filter(note => note.id === Number(noteId));
        setNoteBody(note[0].body)
    }


    return (
        <main>
            <h1>Notes</h1>
            <ul>
                {notes.map(note => {
                    return (
                        <li key={note.id} id={note.id} onClick={handleShowNote}>
                            {note.title}
                        </li>
                    )
                })}
            </ul>

            <div className="note-body">
                {noteBody}
            </div>

            <label htmlFor="title">title (optional)</label>
            <br/>
            <input ref={titleRef} id="title" type="text"/>
            <br/>
            <br/>
            <textarea id="body" ref={textareaRef} cols="30"
                      rows="10"></textarea>
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
