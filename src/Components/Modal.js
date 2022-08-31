import React from 'react'
import '../Styles/Modal.css'

const Modal = ({ showModal, closeModal, title, body, pText, nText, activeNote, setNotes, setActiveNote }) => {
    const style = {
        transform: showModal.show ? "translateY(-10vh)" : "translateY(-100vh)",
        transition: "all 0.8s ease",
        opacity: '1'
    }
    // console.log(handleDelete)
    const postiveAction = () => {

        setNotes(prevNotes => {
            const newNotes = prevNotes.filter(note => note.id !== showModal.noteId)
            return newNotes
        })

        if (activeNote && activeNote.id === showModal.noteId) {
            setActiveNote(null)
        }

    }
    return (
        <div className='modal-wrapper' style={style}>
            {/* {console.log(showModal)} */}
            <div className="modal-container" >
                <div className="modal-title">
                    <p>{title ? title : "Pass title as a prop"}</p>
                    <span onClick={closeModal}>&times;</span>
                </div>
                <div className="modal-content">
                    {body ? body : "Pass body as a prop"}
                </div>
                <div className="modal-footer">
                    <button className='positive-btn' onClick={postiveAction}>{pText ? pText : "Sure!"}</button>
                    <button className='negative-btn' onClick={closeModal}>{nText ? nText : "No"}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal