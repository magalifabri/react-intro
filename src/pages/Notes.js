import React, {useState, useRef, useEffect} from 'react';
import '../styles/NotesStyle.scss';

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

        titleRef.current.value = '';
        textareaRef.current.value = '';
    }


    const handleClearAll = () => {
        localStorage.clear();
    }


    const handleShowNote = (event) => {
        const noteId = event.target.id
        const note = notes.filter(note => note.id === Number(noteId));
        setNoteBody(note[0].body)
    }


    const getNotes = () => {
        if (!notes.length) {
            return 'add a note';
        } else {
            return notes.map(note => {
                return (
                    <li className="notes__item"
                        key={note.id} id={note.id}
                        onClick={handleShowNote}>
                        {note.title}
                    </li>
                )
            })
        }
    }


    return (
        <main>
            <h1 className="page-title">Notes</h1>

            <div className="flex-wrapper notes">
                <ul className="notes__list">
                    {getNotes()}
                </ul>

                <div className="notes__note-body">
                    {noteBody}
                </div>

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

                <button className="button-style-1" onClick={handleClearAll} >
                    clear all
                </button>
            </div>
        </main>
    );
};

export default Notes;
