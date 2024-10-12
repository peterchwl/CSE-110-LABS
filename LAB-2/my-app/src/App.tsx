import React, { useState, useContext } from 'react';
import './App.css';
import { dummyNotesList } from "./constants";
import { FavoritesButton, BlankSpace } from "./hooksExcersize";
import { ThemeContext, themes } from "./themeContext";
import { Label } from "./types";

function App() {
  return (
    <ToggleTheme></ToggleTheme>
  )
}

export function ToggleTheme() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <App2 toggleTheme={toggleTheme}></App2>
    </ThemeContext.Provider>
  );
}

function App2(props: { toggleTheme: React.MouseEventHandler<HTMLButtonElement> | undefined; }) {
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };

  const [favorites, setFavorites] = useState<string[]>([]);
  const [notes, setNotes] = useState(dummyNotesList);
  const [createNote, setCreateNote] = useState(initialNote);
  const [currentEditedNote, setCurrentEditedNote] = useState(-1);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const editHandler = (id: number) => {
    setCurrentEditedNote(id);
  }

  const deleteNote = (id: number) => {
    const noteTitle = notes.find(note => note.id === id)?.title;
    setNotes(notes.filter(note => note.id !== id));
    if (noteTitle && favorites.includes(noteTitle)) {
      setFavorites(prevFavorites => prevFavorites.filter(title => title !== noteTitle));
    }
  }

  const handleFavoriteToggle = (id: number) => {
    const note = notes.find(note => note.id === id);
    // so it passes the undefined type check
    if (note) {
      if (favorites.includes(note.title)) {
        setFavorites(prevFavorites => prevFavorites.filter(title => title !== note.title));
      } else {
        setFavorites(prevFavorites => [...prevFavorites, note.title]);
      }
    }
  };

  const theme = useContext(ThemeContext);

  console.log(theme);
  return (
    <div className="app-container"
      style={{
        background: theme.background,
        color: theme.foreground,
        padding: "20px",
      }}>
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            onChange={(event) => {
              setCreateNote({ ...createNote, title: event.target.value })
            }}
            required>
          </input>
        </div>

        <div>
          <textarea
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })}
            required>
          </textarea>
        </div>

        <div>
          <select
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label})}
            required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div><button type="submit">Create Note</button></div>
      </form>

      {/* <ToggleTheme /> */}
      <button onClick={props.toggleTheme}> Toggle Theme </button>

      <BlankSpace />

      <div className="notes-grid"
        style={{
          background: theme.background,
          color: theme.foreground,
        }}>
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            style={{
              background: theme.background,
              color: theme.foreground,
            }}>
            <div className="notes-header">
              <button style={{
                background: theme.background,
                color: theme.foreground,
              }} onClick={() => deleteNote(note.id)}>x</button>
              <button onClick={() => editHandler(note.id)}>Edit</button>
              <FavoritesButton isFavorited={favorites.includes(note.title)} onToggleFavorite={() => handleFavoriteToggle(note.id)}
              />
            </div>
            <h2 contentEditable={currentEditedNote == note.id} style={{background: currentEditedNote === note.id ? 'lightgrey' : undefined}}>{note.title}</h2>
            <p contentEditable={currentEditedNote == note.id} style={{background: currentEditedNote === note.id ? 'lightgrey' : undefined}}>{note.content}</p>
            <p contentEditable={currentEditedNote == note.id} style={{background: currentEditedNote === note.id ? 'lightgrey' : undefined}}>{note.label}</p>
          </div>
        ))}
      </div>

      <div className="favorites-list">
        <h3>Favorite Notes</h3>
        <ul>
          {favorites.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
