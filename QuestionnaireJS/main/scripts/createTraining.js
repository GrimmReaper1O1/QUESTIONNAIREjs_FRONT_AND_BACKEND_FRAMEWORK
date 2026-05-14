let fill = (e) => {
    e.preventDefault();
    location.href = '/main/fillSubject.html';
}
let select = (e) => {
    e.preventDefault();
    location.href = '/main/selectSubjectsAndQuestionsToAlter.html?reset=yes';
}

sessionStorage.removeItem('subjectId');
sessionStorage.removeItem('questionId');