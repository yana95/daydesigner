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
    listLists() {
        return axios.get(`http://localhost:8000/lists`);
    },
    createList(data) {
        return axios.post(`http://localhost:8000/lists`, data);
    }
}
