console.log("hello game")
const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(question)

const questionCounter = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

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
    },
    {
        question: "A legacy application needs to interact with local storage using iSCSI. A team needs to design a reliable storage solution to provision all new storage on AWS.\nWhich storage solution meets the legacy application requirements?",
        choice1: "AWS Snowball storage for the legacy application until the application can be re-architected",
        choice2: "AWS Storage Gateway in cached mode for the legacy application storage to write data to Amazon S3",
        choice3: "AWS Storage Gateway in stored mode for the legacy application storage to write data to Amazon S3",
        choice4: "An Amazon S3 volume mounted on the legacy application server locally using the File Gateway service",
        answer: 3
    },
    {
        question: "A Solutions Architect is designing an architecture for a mobile gaming application. The application is expected to be very popular. The Architect needs to prevent the Amazon RDS MySQL database from becoming a bottleneck due to frequently accessed queries.\nWhich service or feature should the Architect add to prevent a bottleneck?",
        choice1: "Multi-AZ feature on the RDS MySQL Database",
        choice2: "ELB Classic Load Balancer in front of the web application tier",
        choice3: "Amazon SQS in front of RDS MySQL Database",
        choice4: "Amazon ElastiCache in front of the RDS MySQL Database",
        answer: 4
    }
]

// Constants
const MAX_QUESTION = 4;
const CORRECT_BONUS = 100/MAX_QUESTION;

startGame = () => {
    questionCount = 0;
    score = 0;
    availableQuestions= [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCount >= MAX_QUESTION) {
        //
        localStorage.setItem("mostRecentScore", score);
        //
        return window.location.href = "end.html";
    }

    questionCount++;
    questionCounter.innerHTML = `Question ${questionCount}/${MAX_QUESTION}`;
    progressBarFull.style.width = `${(questionCount/MAX_QUESTION) * 100}%`;

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

        const classToApply = (selectedAnswer == currQuestion.answer) ? 'correct' : 'incorrect';
        
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        
        console.log(classToApply);

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerHTML = score;
}
startGame();
