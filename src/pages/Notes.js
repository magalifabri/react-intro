import React, {useState, useRef, useEffect} from 'react';
import NoteEdit from "../components/NoteEdit";
import NoteView from "../components/NoteView";
import NoteAdd from "../components/NoteAdd";
import '../styles/NotesStyle.scss';

const LOCAL_STORAGE_NOTES_KEY = 'notes';
const LOCAL_STORAGE_ID_COUNTER_KEY = 'idCounter';


const Notes = () => {
    const textareaRef = useRef();
    const editTextareaRef = useRef();
    const [notes, setNotes] = useState([]);
    const [idCounter, setIdCounter] = useState(0);
    const [mode, setMode] = useState('add');
    const [selectedNote, setSelectedNote] = useState({});


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
        const textareaInput = textareaRef.current.value;
        if (!textareaInput) {
            return;
        }
        const titleInput = textareaInput.slice(0, 25) + '...';

        setNotes(prevState => {
            return [...prevState, {
                id: idCounter,
                title: titleInput,
                body: textareaInput
            }];
        });

        setIdCounter(prevState => prevState + 1);

        textareaRef.current.value = '';
    }


    const handleDeleteNote = (noteId) => {
        const newNotes = notes.filter(note => note.id !== noteId);

        setNotes(newNotes);
        setMode('add');
    }


    const handleEditNote = (noteId) => {
        const newNotes = [...notes];

        newNotes.map(note => {
            if (note.id === noteId) {
                const editTextareaInput = editTextareaRef.current.value;

                note.title = editTextareaInput.slice(0, 25) + '...';
                note.body = editTextareaInput;
            }
        });

        setNotes(newNotes);
        setMode('view');
    }


    const handleClearAll = () => {
        localStorage.clear();
    }


    const handleShowNote = (event) => {
        const noteId = event.target.id
        const note = notes.filter(note => note.id === Number(noteId));

        setSelectedNote(note[0]);
        setMode('view');
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


    const getModeContent = () => {
        switch (mode) {
            case 'edit':
                return <NoteEdit note={selectedNote}
                                 setMode={setMode}
                                 handleEditNote={handleEditNote}
                                 editTextareaRef={editTextareaRef}
                                 handleDeleteNote={handleDeleteNote}/>

            case 'view':
                return <NoteView note={selectedNote}
                                 setMode={setMode}
                                 handleDeleteNote={handleDeleteNote}/>

            case 'add':
                return <NoteAdd textareaRef={textareaRef}
                                handleAddNote={handleAddNote}/>
        }
    }


    return (
        <main>
            <h1 className="page-title">Notes</h1>

            <div className="flex-wrapper notes">
                <ul className="notes__list">
                    {getNotes()}
                </ul>

                {getModeContent()}

                <button className="button-style-1" onClick={handleClearAll}>
                    clear all
                </button>
            </div>
        </main>
    );
};

export default Notes;
