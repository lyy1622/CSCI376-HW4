// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false }
      ]
    },
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyperlink Markup Language", correct: false },
        { text: "Hypertext Markup Logic", correct: false },
        { text: "Hypertext Markup Language", correct: true },
        { text: "Hypertext Manual Logic", correct: false }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // We can view in the html file the specific ids assigned to each elements of the webpage. These ids can then be used by document.getElementById().
  // The ids that are referenced in the 3 lines of code below are located in the index.html file on lines 14, 15, and 18 respectively
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const hintButton = document.getElementById("hint-btn");

  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // Whereas previous page elements only differ through changing the text content (such as the questionElement), the answer buttons may differ
      // in the number of possible answers presented depending on the question (though this is not utilized in the current code). 
      // Thus, dynamically creating these HTML elements allows additional flexibility in the number/design of answer button elements between questions
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing? 
      // This line appends the recently created button element as the last child of the answerButtonsElement. This will allow all created button elements
      // to appear in the answer-buttons div ( with class "btn-grid")
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    answerButtonsElement.innerHTML = "";
    hintButton.style.display = "Block";
    
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // This allows the next button elmeent to be displayed once an answer is selected, 
    // allowing the user to move on to the next question (or reset the quiz at the end)
    // If this line was not included, the next button would stay with nextButton.style.display = "none", meaning the next button would remain hidden
    // from the user, preventing them from advancing through the quiz
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    hintButton.style.display = "none";
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  // 6. Summarize in your own words what you think this block of code is doing. 
  // The block of code changes the next button click event depending on where in the quiz the user is
  // If the user is still answering questions (including being on the last question), clicking the next button will call handleNextButton(),
  // which either advaces the user to the next question or shows the score if the last question has just been answered
  // If the user is done answering questions (currentQuestionIndex >= questions.length), the next button will call startQuiz(), resetting the quiz
  // It should be noted that the text content of the next button also changes to "Restart" if the user is done answering questions, informing
  // them of this change in functionality
  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });

  function selectRandomWrongAnswer() {
    const buttonArray = Array.from(answerButtonsElement.children);
    const randomButton = buttonArray[Math.floor(Math.random()*buttonArray.length)];
    if (randomButton.dataset.correct !== "true") {
      randomButton.classList.add("wrong");
    }
    else {
      selectRandomWrongAnswer();
    }
  }

  hintButton.addEventListener("click", () => {    
    selectRandomWrongAnswer();
    hintButton.style.display = "none";
  });
  startQuiz();
  