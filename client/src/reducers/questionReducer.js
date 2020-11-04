
import {
        RECEIVE_QUESTIONS,
} from "../actions/questionActions";


const questionReducer = ( state = [], action) => {
      switch (action.type) {
        case RECEIVE_QUESTIONS:
            return action.questions
        default:
            return state
    }
};

export default questionReducer;