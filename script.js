$(document).ready(function () {
    let questions = [];
    let score = 0;

   
    $.getJSON("questions.json", function (data) {
        questions = data;
        renderQuestions();
    });

    
    function renderQuestions() {
        const quizContainer = $("#quiz-container");
        quizContainer.empty();

        questions.forEach((question, index) => {
            const questionHtml = `
                <div class="mb-4">
                    <p><strong>${index + 1}. ${question.question}</strong></p>
                    ${question.options.map((option, optIndex) => `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="question${index}" id="q${index}opt${optIndex}" value="${option}">
                            <label class="form-check-label" for="q${index}opt${optIndex}">${option}</label>
                        </div>
                    `).join("")}
                </div>
            `;
            quizContainer.append(questionHtml);
        });
    }


    $("#submit-quiz").click(function () {
        score = 0;
        const warning = $("#warning");
        const quizForm = $("#quiz-form");
        const resultContainer = $("#result-container");

        warning.addClass("d-none");
        resultContainer.addClass("d-none");

        
        let allAnswered = true;

        questions.forEach((_, index) => {
            const selectedAnswer = $(`input[name="question${index}"]:checked`).val();
            if (!selectedAnswer) {
                allAnswered = false;
            }
        });

        if (!allAnswered) {
            warning.removeClass("d-none");
            return;
        }

      
        questions.forEach((question, index) => {
            const selectedAnswer = $(`input[name="question${index}"]:checked`).val();
            if (selectedAnswer === question.answer) {
                score++;
            }
        });

        
        quizForm.addClass("d-none");
        $("#score-display").text(`คุณได้คะแนน ${score} จากทั้งหมด ${questions.length} ข้อ`);
        resultContainer.removeClass("d-none");
    });

   
    $("#restart-quiz").click(function () {
        score = 0;
        $("#quiz-form").removeClass("d-none");
        $("#result-container").addClass("d-none");
        renderQuestions();
    });
});
