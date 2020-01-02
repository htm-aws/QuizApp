console.log("hello game")
const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(question)

let currQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let  questions = [
    {
        question: "A Solutions Architect is designing an application that will encrypt all data in an Amazon Redshift cluster.\nWhich action will encrypt the data at rest?",
        choice1: "Place the Redshift cluster in a private subnet",
        choice2: "Use the AWS KMS Default Customer master key",
        choice3: "Encrypt the Amazon EBS volumes",
        choice4: "Encrypt the data using SSL/TLS",
        answer: 2
    },
    {
        question: "A website experiences unpredictable traffic. During peak traffic times, the database is unable to keep up with the write request.\nWhich AWS service will help decouple the web application from the database?",
        choice1: "Amazon SQS",
        choice2: "Amazon EFS",
        choice3: "Amazon S3",
        choice4: "AWS Lambda",
        answer: 1
    }
]

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTION = 2;

startGame = () => {
    questionCount = 0;
    score = 0;
    availableQuestions= [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCount >= MAX_QUESTION) {
        return window.location.assign("/end.html");
    }

    questionCount++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currQuestion = availableQuestions[questionIndex];
    question.innerText = currQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = currQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        // console.log(e.target);
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        console.log(selectedAnswer);
        getNewQuestion();
    })
})

startGame();
