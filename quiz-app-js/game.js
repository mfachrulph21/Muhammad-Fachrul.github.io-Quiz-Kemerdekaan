const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Tokoh pertama yang mengetik teks proklamasi?',
        choice1: 'Sayuti Melik',
        choice2: 'Soekarno',
        choice3: 'Moh Hatta',
        choice4: 'Achmad Soebardjo',
        answer: 1,
    },
    {
        question:
            "Kemerdekaan Indonesia(proklamasi kemerdekaan) terjadi ketika indonesia berada dibawah jajahan?",
        choice1: "Belanda",
        choice2: "Portugis",
        choice3: "Spanyol",
        choice4: "Jepang",
        answer: 4,
    },
    {
        question: "Pembacaan naskah proklamasi dilakukan di?",
        choice1: "Jalan pengangsaan timur 56",
        choice2: "Rengasdengklok",
        choice3: "Jalan imam bonjol",
        choice4: "rumah",
        answer: 1,
    },
    {
        question: "Tokoh yang tidak termasuk penyusun teks proklamasi adalah?",
        choice1: "Soekarno",
        choice2: "Moh Hatta",
        choice3: "Soewirjo",
        choice4: "Achmad Soewirjo",
        answer: 3,
    },
    {
        question: "Kepanjangan dari PETA?",
        choice1: "Pembebas Tanah Air",
        choice2: "Pejuang Tanah Air",
        choice3: "Pembela Tanah Air",
        choice4: "Pemuda Tanah Air",
        answer: 3,
    },
    {
        question: "Tokoh yang memberikan kata sambutan ketika upacara pembacaan teks proklamasi adalah?",
        choice1: "Moh Hatta",
        choice2: "Soekarno",
        choice3: "Soewirjo",
        choice4: "Nggak kenal",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()