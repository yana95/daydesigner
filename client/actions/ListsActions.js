import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const ListsActions = {
    createList(list) {
        api.createList(list)
        .then((resp) =>{
                this.loadLists();
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

    editList(list){
        api.editList(list)
        .then((resp) =>{
                this.loadLists();
            }
        )
        .catch(err =>
            console.error(err)
        );
    },
    
    deleteList(listData){
        api.deleteList(listData.id)
        .then(() =>{
                this.loadLists();
            }
        )
        .catch(err =>
            console.error(err)
        );
    },

    loadLists() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_LIST_REQUEST
        });

        api.listLists()
        .then(({ data }) =>{
            AppDispatcher.dispatch({
                type: Constants.LOAD_LIST_SUCCESS,
                lists: data
            })
        }
            
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_LIST_FAIL,
                error: err
            })
        );
    }

};

export default ListsActions;
