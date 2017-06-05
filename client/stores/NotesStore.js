import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _notes = [];
let _lists = [];
let _loadingError = null;
let _isLoading = true;

function formatNote(note) {
    return {
        id: note._id,
        title: note.title,
        text: note.text,
        status: note.status,
        tasks: note.tasks,
        starred: note.starred,
        listId: note.listId
    };
}

function formatList(list) {
    return {
        id: list._id,
        title: list.title,
        edit: list.edit
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getNotes() {
        return _notes;
    },

    getLists() {
        return _lists;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_NOTES_REQUEST: {
            _isLoading = true;
            break;
        }
        case AppConstants.LOAD_NOTES_SUCCESS: {
            _isLoading = false;
            _notes = action.notes.map( formatNote );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_LIST_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_LIST_REQUEST: {
            _isLoading = true;
            break;
        }
        case AppConstants.LOAD_LIST_SUCCESS: {
            _isLoading = false;
            _lists = action.lists.map( formatList );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_LIST_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }


        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;
