import axios from 'axios';

//================= Survey
export const ADD_QUESTION = "ADD_QUESTION";
export const addQuestion = (newInput) => {
 return {
     type: ADD_QUESTION,
     newInput: newInput
 };
}

export const EDIT_QUESTION = "EDIT_QUESTION";
export const editQuestion = (index, data) => {
  return {
      type: EDIT_QUESTION,
      index: index,
      data: data
  };
}

export const REMOVE_QUESTION = "REMOVE_QUESTION";
export const removeQuestion = (index) => {
 return {
     type: REMOVE_QUESTION,
     index: index
 };
}
export const FETCH_INITIAL = "FETCH_INITIAL";
export function fetchInitial() {
    return (dispatch) => {
        dispatch({type: FETCH_INITIAL});
    };
}
