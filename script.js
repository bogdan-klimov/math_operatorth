const numberMark1Txt = document.querySelector('.number_mark_1_txt'),
    operationMarkTxt = document.querySelector('.operation_mark_txt'),
    numberMark2Txt = document.querySelector('.number_mark_2_txt'),
    answersItem = document.getElementsByClassName('answer_list__txt'),
    answersBlock = document.getElementsByClassName('answers_list__item')
    operatorsItems = document.getElementsByClassName('operators__item'),
    trueAnswerScrean = document.querySelector('.true_answer_screan'),
    falseAnswerScrean = document.querySelector('.false_answer_screan'),
    operatorsArr = ['+', '-', '*', '/']
    answerResults = [['Вірно!', 'Молодець!', 'Чудово!', 'Правильно!', 'Так тримати!'],
                    ['Неправильно!', 'Помилка!', 'Подумай ще раз!', 'Невірно!', 'Ще одна спроба!']]
    trueAnswerResult = document.querySelector('.true_answer_screan__txt')
    falseAnswerResult = document.querySelector('.false_answer_screan__txt')
    burger = document.querySelector('.burger')
    operatorsBlock = document.querySelector('.operators')
    
let randomAnswersPositions = [],
    currentOperations = '+',
    burgerToggle = 0,
    result 

const activeteAnswerScrean = (answerScrean) => {
    if (answerScrean == trueAnswerScrean) {
        trueAnswerResult.textContent = answerResults[0][generateNum(answerResults[0].length-1)]
    } else {
        falseAnswerResult.textContent = answerResults[1][generateNum(answerResults[1].length-1)]
    }
    answerScrean.classList.add('answer_screan_active')
    setTimeout(() => {
        answerScrean.classList.remove('answer_screan_active')
    }, 1300);
}

const addTxtToQuestion = (txt, operator, txt2) => {
    result = Math.ceil((eval(txt + operator + txt2)) * 10 ) / 10 
    numberMark1Txt.innerHTML = String(txt) 
    operationMarkTxt.innerHTML = String(operator)
    numberMark2Txt.innerHTML = String(txt2)
}

const addTxtToAnswers = (result, randomAnswer1, randomAnswer2) => {
    answersItem[randomAnswersPositions[0]].textContent = result
    answersItem[randomAnswersPositions[1]].textContent = randomAnswer1
    answersItem[randomAnswersPositions[2]].textContent = randomAnswer2
}

const getRandomNewQuestion = (func, operator) => {
    func()
    addTxtToQuestion(randomQuestion1, operator, randomQuestion2)
}   

const getRandomPosition = () => {
    for (let i = 0; i < 3; i++) {randomAnswersPositions[i] = Math.round(Math.random() * 2)}
    if (randomAnswersPositions[0] === randomAnswersPositions[1] || 
        randomAnswersPositions[1] === randomAnswersPositions[2] || 
        randomAnswersPositions[2] === randomAnswersPositions[0]) {
        getRandomPosition()
    }
}

const generateNum = (limits) => {
    return Math.round(Math.random() * limits)
}

const getRandomNumsAdd = () => {
    randomQuestion1 = generateNum(10)
    randomQuestion2 = generateNum(10)
}

const getRandomAnswersAdd = () => {
    randomAnswer1 = Math.round(Math.random() * 20)
    randomAnswer2 = Math.round(Math.random() * 20)
    if (randomAnswer1 === result || randomAnswer2 === result || 
        randomAnswer1 === randomAnswer2) {getRandomAnswersAdd()}
}

const getRandomNumsMinus = () => {
    randomQuestion1 = generateNum(10)
    randomQuestion2 = generateNum(10)
    if (randomQuestion1 - randomQuestion2 <= 0) getRandomNumsMinus()
}

const getRandomAnswersMinus = () => {
    randomAnswer1 = generateNum(10)
    randomAnswer2 = generateNum(10)
    if (randomAnswer1 === result || randomAnswer2 === result || 
        randomAnswer1 === randomAnswer2) {getRandomAnswersMinus()}
}

const getRandomNumsMult = () => {
    randomQuestion1 = generateNum(10)
    randomQuestion2 = generateNum(10)
}

const getRandomAnswersMult = () => {
    randomAnswer1 = generateNum(10) * generateNum(10)
    randomAnswer2 = generateNum(10) * generateNum(10)
    if (randomAnswer1 === result || randomAnswer2 === result || 
        randomAnswer1 === randomAnswer2) {getRandomAnswersMult()}
}

const getRandomNumsDivide = () => {
    randomQuestion1 = generateNum(10) * generateNum(10)
    randomQuestion2 = generateNum(10) * generateNum(10)
    if (randomQuestion1 == 0 
        || randomQuestion2 == 0
        || randomQuestion1 - randomQuestion1 < 0
        || randomQuestion1 === result 
        || randomQuestion2 === result 
        || randomQuestion1 === randomQuestion2
        ) getRandomNumsDivide()
}
const getRandomAnswerDivide = () => {
    randomAnswer1 = Math.ceil(generateNum(10) / generateNum(10)*10)/10 
    randomAnswer2 = Math.ceil(generateNum(10) / generateNum(10)*10)/10 
    if ( randomAnswer1 == 0 
        || randomAnswer2 == 0 
        || randomAnswer1 === result 
        || randomAnswer2 === result 
        || randomAnswer1 === randomAnswer2
        || randomAnswer1 == Infinity 
        || randomAnswer2 == Infinity) getRandomAnswerDivide()
}

const getRandomNewQuestionBlock = () => {
    if (currentOperations == '+') {
        getRandomNewQuestion(getRandomNumsAdd, currentOperations) 
    } else if (currentOperations == '-') {
        getRandomNewQuestion(getRandomNumsMinus, currentOperations)
    } else if (currentOperations == '*') {
        getRandomNewQuestion(getRandomNumsMult, currentOperations)
    } else if (currentOperations == '/') {
        getRandomNewQuestion(getRandomNumsDivide, currentOperations)
    }
}

const getRandomNewAnswersBlock = () => {
    if (currentOperations == '+') {
        getRandomAnswersAdd()
    } else if (currentOperations == '-') {
        getRandomAnswersMinus()
    } else if (currentOperations == '*') {
        getRandomAnswersMult()
    } else if (currentOperations == '/') {
        getRandomAnswerDivide()
    }
}

const generateNewAnswer = () => {
    getRandomPosition()
    getRandomNewQuestionBlock()
    getRandomNewAnswersBlock()
    addTxtToAnswers(result, randomAnswer1, randomAnswer2)
}

const activeteBurger = () => {
    burger.classList.add('burger-active')
    operatorsBlock.style.top = '60px'
    burgerToggle++
}

const disableBurger = () => {
    burger.classList.remove('burger-active')
    operatorsBlock.style.top = '-240px'
    burgerToggle++
}

burger.addEventListener('click', () => {
    if (burgerToggle % 2 == 0) return activeteBurger()
    disableBurger() 
})

operatorsItems[0].classList.add('active_operator_item')

for (let i = 0; i < operatorsItems.length; i++) {
    operatorsItems[i].addEventListener('click', () => {
        for (let j = 0; j < operatorsItems.length; j++) {operatorsItems[j].classList.remove('active_operator_item') }
        operatorsItems[i].classList.add('active_operator_item')
        currentOperations = operatorsArr[i]
        disableBurger()
        generateNewAnswer()
    })
}

for (let i = 0; i < answersBlock.length; i++) {
    answersBlock[i].addEventListener('click', () => {
        if (answersBlock[i].textContent == result) {
            activeteAnswerScrean(trueAnswerScrean)
            setTimeout(generateNewAnswer, 1000) 
        } else {activeteAnswerScrean(falseAnswerScrean)}
    })
}

generateNewAnswer()
