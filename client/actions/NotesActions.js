import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const NoteActions = {
    createNote(note) {
        api.createNote(note)
        .then((resp) =>{
                this.loadNotes();
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

    checkNote(noteId){
        api.checkNote(noteId)
        .then(() =>
            this.loadNotes()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteNotes(listData){
        api.deleteNotes(listData.id)
        .then(() =>{
                this.loadNotes();
            }
        )
        .catch(err =>
            console.error(err)
        );
    },
    checkSubtask(noteId, subtaskId){
        api.checkSubtask(noteId, subtaskId)
        .then(() =>
            this.loadNotes()
        )
        .catch(err =>
            console.error(err)
        );
    },

    editNote(noteId,data){
        api.editNote(noteId,data)
        .then(() =>
            this.loadNotes()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteNote(noteId) {
        api.deleteNote(noteId)
        .then(() =>
            this.loadNotes()
        )
        .catch(err =>
            console.error(err)
        );
    },

    loadNotes() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_NOTES_REQUEST
        });

        api.listNotes()
        .then(({ data }) =>{
            AppDispatcher.dispatch({
                type: Constants.LOAD_NOTES_SUCCESS,
                notes: data
            })
        }
            
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_NOTES_FAIL,
                error: err
            })
        );
    }

};

export default NoteActions;
