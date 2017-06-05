import axios from 'axios';


export default {
    createNote(data) {
        return axios.post(`http://localhost:8000/notes`, data);
    },
    listNotes() {
        return axios.get(`http://localhost:8000/notes`);
    },
    checkNote(id){
    	return axios.put(`http://localhost:8000/notes/check/${id}`,id);
    },
    checkSubtask(noteId, subtaskId){
        var data = {
            noteId: noteId,
            subtaskId: subtaskId
        }
        return axios.put(`http://localhost:8000/notes/subtask/check/${noteId}`,data);
    },
    editNote(id,data){
    	var request = {
            id:id,
            data:data
        }
        return axios.put(`http://localhost:8000/notes/${id}`,request);
    },
    deleteNote(noteId) {
        return axios.delete(`http://localhost:8000/notes/${noteId}`);
    },
    deleteNotes(listId) {
        return axios.delete(`http://localhost:8000/list/notes/${listId}`);
    },
    listLists() {
        return axios.get(`http://localhost:8000/lists`);
    },
    createList(data) {
        return axios.post(`http://localhost:8000/lists`, data);
    },
    deleteList(id) {
        return axios.delete(`http://localhost:8000/lists/${id}`);
    }
}
