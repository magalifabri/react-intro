import React, {useState, useRef, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import NoteEdit from "../components/NoteEdit";
import NoteView from "../components/NoteView";
import NoteAdd from "../components/NoteAdd";
import '../styles/NotesStyle.scss';

const LOCAL_STORAGE_NOTES_KEY = 'notes';


const Notes = () => {
    const textareaRef = useRef();
    const editTextareaRef = useRef();
    const [notes, setNotes] = useState([]);
    const [mode, setMode] = useState('add');
    const [selectedNote, setSelectedNote] = useState({});


    // get notes from LS
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NOTES_KEY));

        if (storedNotes && storedNotes.length > 0) {
            setNotes(storedNotes);
        }
    }, []);


    // save notes to LS
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, JSON.stringify(notes));
    }, [notes]);


    // remove selected note styling when going back to NoteAdd
    useEffect(() => {
        if (mode === 'add') {
            setSelectedNote({});
        }
    }, [mode])


    const handleAddNote = () => {
        const textareaInput = textareaRef.current.value;
        if (!textareaInput) {
            return;
        }

        let titleInput;
        if (textareaInput.length > 25) {
            titleInput = textareaInput.slice(0, 25) + '...';
        } else {
            titleInput = textareaInput;
        }

        setNotes(prevState => {
            return [...prevState, {
                id: uuidv4(),
                title: titleInput,
                body: textareaInput,
                new: true,
            }];
        });

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
        localStorage.removeItem(LOCAL_STORAGE_NOTES_KEY);
        setNotes([]);
        setMode('view');
    }


    const handleShowNote = (event) => {
        const noteId = event.target.id
        const note = notes.filter(note => note.id === noteId);

        setSelectedNote(note[0]);
        setMode('view');
    }


    const getClassName = (note) => {
        let className = "notes__item";

        if (note.id === selectedNote.id) {
            className += " notes__item--selected";
        }

        if (note.new) {
            className += " notes__item--new";
        }

        return className;
    }


    const setNewToFalse = (event) => {
        const noteId = event.target.id

        const newNotes = [...notes];
        const noteToChange = newNotes.find(
            note => note.id === noteId
        );

        noteToChange.new = false;
        setNotes(newNotes);
    }


    const getNotes = () => {
        if (!notes.length) {
            return 'No notes yet';
        } else {
            return (
                <ul className="notes__list">
                    {notes.map(note => {
                        return (
                            <li className={getClassName(note)}
                                key={note.id} id={note.id}
                                onClick={handleShowNote}
                                onAnimationEnd={setNewToFalse}
                            >
                                {note.title}
                            </li>
                        )
                    })}
                </ul>
            )
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
        <>
            <h1 className="page-title">Notes</h1>

            <div className="flex-wrapper notes">
                {getNotes()}

                {getModeContent()}

                <button className="button-style-1 button-style-1--danger button-style-1--right"
                        onClick={handleClearAll}>
                    clear all
                </button>
            </div>
        </>
    );
};

export default Notes;
