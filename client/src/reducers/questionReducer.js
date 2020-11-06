
import {
        RECEIVE_QUESTIONS,
        SET_ANSWERS,
} from "../actions/questionActions";

const initialState = {

}


const questionReducer = ( state = initialState, action) => {
      switch (action.type) {
        case RECEIVE_QUESTIONS:
            // return {...state, questions: action.questions}
            return action.questions
        // case SET_ANSWERS:
        //     return {...state, answers: action.answers }
        default:
            return state
    }
};

export default questionReducer;