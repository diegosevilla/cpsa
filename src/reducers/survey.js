import { ADD_QUESTION, EDIT_QUESTION, REMOVE_QUESTION, FETCH_INITIAL } from '../actions';

const initialState = {
   inputs: []
}

const survey = (state = initialState, action) => {
   let newArray = state.inputs;
   switch (action.type) {
      case ADD_QUESTION:
        newArray.push(action.newInput);
        return Object.assign({}, state, {
             inputs: newArray
        });
      case EDIT_QUESTION:
        let index = action.index;
        newArray[index] = action.data;
        return Object.assign({}, state, {
             inputs: newArray
        });
      case REMOVE_QUESTION:
        index = action.index;
        newArray.splice(index, 1);
        return Object.assign({}, state, {
             inputs: newArray
        });
      case FETCH_INITIAL:
        return state;
      default:
         return state
   }
}

 export default survey;
