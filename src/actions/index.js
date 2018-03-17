export const SET_SURVEY = "SET_SURVEY";
export function setSurvey(survey){
  return {
    type: SET_SURVEY,
    survey: survey
  };
}

export const FETCH_SURVEY = 'FETCH_SURVEY';
export function fetchSurvey(id){
  return (dispatch) =>  {
    return fetch('/api/survey/'+id)
    .then((res) => res.json())
    .then((survey) => {
      dispatch(setSurvey(survey))
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
  }
};

export function createSurvey(surveyName){
  return (dispatch) => {
    let formData = 'surveyName='+surveyName;
    return fetch('/api/survey/create', {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: formData
    }).then((res) => res.json())
    .then((survey) =>  dispatch(fetchSurvey(survey.id)))
    .catch((err) => {
      console.log(err);
      throw err
    });
  }
};

export function updateSurvey(survey){
  return (dispatch) => {
    let formData = 'surveyName='+survey.surveyName;
    return fetch('/api/survey/update/'+survey.id, {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: formData
    }).then((res) => res.json())
    .then((survey) =>  dispatch(fetchSurvey(survey.id)))
    .catch((err) => {
      console.log(err);
      throw err
    });
  }
}

export function createQuestion(newQuestion){
  return (dispatch) => {
    let formData  = '';

    for(let key in newQuestion) {
      formData += key+'='+newQuestion[key]+'&';
    }

    formData = formData.slice(0,-1);
    return fetch('/api/question/create', {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: formData
    }).then((res) => res.json())
    .then((question) =>  dispatch(fetchSurvey(question.survey_id)))
    .catch((err) => {
      throw err
    });
  }
};

export function editQuestion(editedQuestion){
  return (dispatch) => {
    let formData  = '';

    for(let key in editedQuestion) {
      formData += key+'='+editedQuestion[key]+'&';
    }

    formData = formData.slice(0,-1);
    return fetch('/api/question/update/'+editedQuestion.id, {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: formData
    }).then((res) => res.json())
    .then((question) =>  dispatch(fetchSurvey(question.survey_id)))
    .catch((err) => {
      console.log(err);
      throw err
    });
  }
}

export function deleteQuestion(id){
  return (dispatch) => {
    return fetch('/api/question/remove/'+id, {method: 'POST'})
    .then((res) => res.json())
    .then((survey) =>  dispatch(fetchSurvey(survey.surveyId)))
    .catch((err) => {
      console.log(err);
      throw err
    });
  }
}
