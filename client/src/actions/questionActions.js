
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";



const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS,
        questions: questions,
    }
}


export const fetchQuestions = () => async(dispatch) => {
    const response = await fetch("/api/home/questions");
    if (response.ok) {
        const {questions} = await response.json();
        dispatch(receiveQuestions(questions))
    }
}