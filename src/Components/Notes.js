import React, { useState, useEffect, useContext, useRef } from 'react'
import "../Styles/Notes.css"
import Note from './Note'
import Loader from './Loader'
import Editor from './Editor'
import data from "./FakeData"
import moment from 'moment'
import { v4 as uuid } from 'uuid'
import SearchContext from '../Context/Search'
import Modal from './Modal'

const Notes = () => {

  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line
  const [notes, setNotes] = useState(data)
  const [activeNote, setActiveNote] = useState(null)
  const { searchValue } = useContext(SearchContext)
  const [searchNotes, setSearchNotes] = useState(null)
  const [modal, setModal] = useState({ show: false, noteId: null })
  const notesRef = useRef(null)

  // useEffect(() => {
  //   getData()
  // }, [])

  // const getData = async () => {
  //   try {
  //     const res = await fetch("https://dummyjson.com/todos")
  //     const data = await res.json()
  //     // setTodos(data.todos)
  //     // console.log(data.todos)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   setLoading(false)
  // }

  useEffect(() => {
    if (searchValue) {

      let searchResults = notes.filter(item => item.title.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue));
      setSearchNotes(searchResults)
    }
    // eslint-disable-next-line
  }, [searchValue])

  const addNewNote = () => {
    const dateTime = new Date()
    const newNoteId = uuid()
    const newNote = {
      userId: '',
      id: newNoteId,
      title: `Untitled ${moment().format('LLL')}`,
      // title: `Title${notes.length + 1}`,
      description: '',
      modified: dateTime
    }
    // setNotes(newAddedNotes)
    setNotes((prevNotes) => {
      const newAddedNotes = [newNote, ...prevNotes]
      return newAddedNotes
    })

    setActiveNote(newNote)
  }

  // const saveNote = () => {
  //   const newNotes = notes.filter(note => note.id !== activeNote.id)

  //   setNotes([...newNotes, { ...activeNote, modified: new Date() }])
  //   setActiveNote(null)
  // }
  const handDelete = (e, noteId) => {
    e.stopPropagation()
    setModal({ show: true, noteId: noteId })
    // if (0) {
    //   setNotes(prevNotes => {
    //     const newNotes = prevNotes.filter(note => note.id !== noteId)
    //     return newNotes
    //   })

    //   if (activeNote && activeNote.id === noteId) {
    //     setActiveNote(null)
    //   }
    // }
  }

  // const element = notesRef.current
  // element.addEventListener('scroll', ()=> console.log("Div scrolling"))
  
  const closeModal = () => {
    setModal({ show: false, noteId: null })
  }

  const handleOnChangeTitle = (e) => {
    setActiveNote((prev) => {
      setNotes(prevNotes => {
        const newNotes = prevNotes.filter(note => note.id !== prev.id)
        return [{ ...prev, title: e.target.value }, ...newNotes]
      })
      return {
        ...prev, title: e.target.value
      }
    })
  }

  const noteElements = notes && notes.map((note, index) => (
    <Note
      key={index}
      note={note}
      index={index}
      setActiveNote={setActiveNote}
      deleteNote={handDelete}
      activeNoteId={activeNote ? activeNote.id : null}
      notes={notes}
    />))

  const searchResults = searchNotes && searchNotes.map((note, index) => (
    <Note
      key={index}
      note={note}
      index={index}
      setActiveNote={setActiveNote}
      deleteNote={handDelete}
      activeNoteId={activeNote ? activeNote.id : null}
    />))


  return (
    <div className='notes-wrapper' onClick={() => setModal(false)} >
      {modal.show && <div className='modal-back-drop' ></div>}
      {<Modal
        showModal={modal}
        setModal={setModal}
        closeModal={closeModal}
        notes={notes}
        activeNote={activeNote}
        setNotes={setNotes}
        setActiveNote={setActiveNote}
        title={"Are you sure?"}
        body={"Do you really want to delete this record? This process cannot be undone."}
        pText={"Delete"}
        nText={"Cancel"}
      />}
      {loading && <Loader />}
      <div className='user-all-notes'>
        <div className="notes-container">
          <div className="note-titles" ref={notesRef}>
            {noteElements.length === 0 && <div className='no-note-titles'><span className='no-note-titles-text'>No Notes</span></div>}
            {(searchResults && searchResults.length) > 0 ? searchResults : noteElements}
          </div>
          <div className="note-edit">
            <div className="current-note-title">
              {
                activeNote ?
                  <span className='input-container margin-left'>
                    <i className="fa fa-sticky-note-o title-note-image"></i>
                    <input
                      value={activeNote.title}
                      className="active-title-input"
                      onChange={handleOnChangeTitle}
                      placeholder="Enter title here" />
                    <span className='active-note'> - Editing</span>
                  </span>
                  : <span className='margin-left'>
                    <i className="fa fa-sticky-note-o editor-title-note-image"></i> Notes</span>
              }
              <div className='btns'>
                <button className="new-note" onClick={addNewNote}>New Note</button>
              </div>
            </div>
            <div className="current-note-editor">
              {
                activeNote ?
                  <Editor
                    activeNote={activeNote}
                    title={activeNote.title}
                    description={activeNote.description}
                    setActiveNote={setActiveNote}
                    notes={notes}
                    setNotes={setNotes}
                  />
                  :
                  <div className='text-editor-container'>
                    <div className='no-note-img' />
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes