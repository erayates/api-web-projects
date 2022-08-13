document.addEventListener('DOMContentLoaded',() => {
    const startBtn = document.querySelector('#startBtn')

    const questionCard = document.querySelector('#question-card')
    const card = document.querySelector('.card')

  
    startBtn.addEventListener('click',() => {
        const categories = document.querySelector('#categories')
        const difficulty = document.querySelector('#difficulty')
        const selectedDifficulty = difficulty.options[difficulty.selectedIndex].value
        const selectedCategory = categories.options[categories.selectedIndex].value
        if(selectedCategory != 'Choose a category' && selectedDifficulty != 'Choose a difficulty'){
            card.className = 'card hidden'
            questionCard.className = ''
            getQuestions(selectedCategory,selectedDifficulty)
        }
       
    })

    
    var counter = 0
    var points = 0
    const setQuestionCard = (questions) => {
        const questionList = questions
        console.log(questionList)
        const questionBody = questionList[counter]       
        questionCard.innerHTML = `
        <div class="block p-6 max-w-full bg-white rounded-lg border border-gray-200  shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 question-inner w-full">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${counter+1}. ${questionBody.question}</h5>
        </div>
        <button type="button" class="nextBtn text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-5 float-right">${counter < 19 ? 'Next':'Finish'}</button>
        `
        const correctAnswer = questionBody.correctAnswer
        const incorrectAnswers = questionBody.incorrectAnswers
        const allChoices = [correctAnswer]
        incorrectAnswers.map((item)=>{
            allChoices.push(item)
            allChoices.sort()
        })
        const qCardChild = questionCard.childNodes[1]

        var choiceCt = 0
        for(let choice of allChoices){
    
            const placeChoice = document.createElement('div')
            placeChoice.classList = 'flex items-center mb-4 mt-8'
            placeChoice.innerHTML = `
            <input id="input_${choiceCt}" name="choice" type="radio" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="input_${choiceCt}" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-light text-base">${choice}</label>
            `
            qCardChild.append(placeChoice)
            choiceCt++
        }
       

       
        const nextBtn = document.querySelector('.nextBtn')
        nextBtn.addEventListener('click',() =>{
           
            if(counter == 19){
                questionCard.innerHTML = `
                <div class="block p-6 max-w-full bg-white rounded-lg border border-gray-200  shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 question-inner w-full">
                 <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Every question has 10 points value. Your points is: <small>${points*10}</small></h5><p></p>
                </div>
                `
            }else{
                const inputs = document.getElementsByName("choice")
                const checkedRadio = Array.from(inputs).find((radio) => radio.checked)
                const checkedLabel = document.querySelector([`label[for=${checkedRadio.getAttribute('id')}]`]).innerText
                if(checkedLabel == correctAnswer){
                    calcPoints()
                }
                console.log(checkedRadio)
                console.log(checkedLabel)
                counter++
                setQuestionCard(questionList)
            }   
           
            })
        }
    const calcPoints = () => {
        points++
        console.log(points)
    }
    
    const getQuestions = async(category,difficulty) => {
        const req = await fetch(`https://the-trivia-api.com/api/questions?categories=${category}&limit=20&difficulty=${difficulty}`)
        const questions = await req.json()
        setQuestionCard(questions)
    }})





   
