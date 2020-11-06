
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SET_ANSWERS = 'SET_ANSWERS'



const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS,
        questions: questions,
        // questions,
    }
}


export const fetchQuestions = () => async(dispatch) => {
    const response = await fetch("/api/home/questions");
    if (response.ok) {
        const {questions} = await response.json();
        dispatch(receiveQuestions(questions))
    }
}

export const setAnswers = (choiceId) => {
    return {
        type: SET_ANSWERS,
        answers: 55
    }
}