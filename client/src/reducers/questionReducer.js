
import {
        RECEIVE_QUESTIONS
} from "../actions/questionActions";

const initialState = {

}


const questionReducer = ( state = initialState, action) => {
      switch (action.type) {
        case RECEIVE_QUESTIONS:
            // return {...state, questions: action.questions}
            return action.questions
        default:
            return state
    }
};

export default questionReducer;