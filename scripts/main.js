document.addEventListener("DOMContentLoaded", function() {
    const quizzes = {
        1: {
            title: "General Knowledge Quiz",
            questions: [
                {
                    question: "What is the capital of France?",
                    choices: ["Berlin", "Madrid", "Paris", "Rome"],
                    correctAnswer: 2
                },
                {
                    question: "Who wrote 'Hamlet'?",
                    choices: ["Charles Dickens", "J.K. Rowling", "William Shakespeare", "Mark Twain"],
                    correctAnswer: 2
                },
                {
                    question: "Who invented Mobile phone?",
                    choices: ["Alexander Graham Bell", "Nikola Tesla", "Martin Cooper", "Michael Faraday"],
                    correctAnswer: 2
                },
                {
                    question: "Which is the largest island in the world",
                    choices: ["Japan", "Greenland", "Phillipines", "Madagascar"],
                    correctAnswer: 1
                }
            ]
        },
        2: {
            title: "Science Quiz",
            questions: [
                {
                    question: "When did the Jallianwala Bagh Massacre happened?",
                    choices: ["1916", "1919", "1915", "1917"],
                    correctAnswer: 1
                },
                {
                    question: "Which of the following king agreed the trade with the East India Company?",
                    choices: ["Jahangir", "Chatrapati Shivaji", "Shah Jahan", "Aurangazeb"],
                    correctAnswer: 0
                },
                {
                    question:"Who wrote the National Song of India (Vande Mataram)",
                    choices:["Rabindranath Tagore","Bankim Chandra Chatterjee","Sharat Chandra Chattpadhyay","None of the above"],
                    correctAnswer: 1
                },
                {
                    question:"In the third battle of Panipat, who defeated Marathas?",
                    choices:["Afghans","Mughals","Britishers","Dutch"],
                    correctAnswer: 0
                }
            ]
        }
    };

    const quizForm = document.getElementById('quiz-form');
    const quizTitle = document.getElementById('quiz-title');
    const submitBtn = document.getElementById('submit-btn');

    // Get quiz ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('id');

    if (quizId && quizzes[quizId]) {
        loadQuiz(quizzes[quizId]);
    } else {
        quizTitle.textContent = "Quiz not found!";
    }

    function loadQuiz(quizData) {
        quizTitle.textContent = quizData.title;

        quizData.questions.forEach((question, index) => {
            const questionSection = document.createElement('section');
            questionSection.classList.add('question');
            
            const questionTitle = document.createElement('h2');
            questionTitle.textContent = `Question ${index + 1}: ${question.question}`;
            questionSection.appendChild(questionTitle);
            
            question.choices.forEach((choice, i) => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `q${index}`;
                input.value = i;

                label.appendChild(input);
                label.appendChild(document.createTextNode(choice));
                questionSection.appendChild(label);
            });

            quizForm.appendChild(questionSection);
        });

        submitBtn.style.display = 'block';

        submitBtn.addEventListener('click', function(event) {
            event.preventDefault();
            calculateScore(quizData);
        });
    }

    function calculateScore(quizData) {
        const formData = new FormData(quizForm);
        let score = 0;

        quizData.questions.forEach((question, index) => {
            if (parseInt(formData.get(`q${index}`)) === question.correctAnswer) {
                score++;
            }
        });

        displayScore(score, quizData.questions.length);
    }

    function displayScore(score, totalQuestions) {
        const scoreDisplay = document.createElement('div');
        scoreDisplay.classList.add('score-display');
        scoreDisplay.innerHTML = `
            <h2>Your Score</h2>
            <p>${score} out of ${totalQuestions}</p>
        `;

        quizForm.innerHTML = '';  // Clear the form
        quizForm.appendChild(scoreDisplay);
        submitBtn.style.display = 'none';  // Hide the submit button
    }
});

