new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
      return {
        step: 'start',
        subjects: [],
        selectedSubject: null,
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
      };
    },
    computed: {
      currentQuestion() {
        return this.questions[this.currentQuestionIndex];
      },
    },
    methods: {
      // เริ่มทำแบบทดสอบ: โหลดรายชื่อวิชา
      async startQuiz() {
        this.step = 'selectSubject';
        const response = await fetch('questions.json');
        const data = await response.json();
        this.subjects = data.map((item) => item.subject);
      },
      // โหลดคำถามสำหรับวิชาที่เลือก
      async loadQuestions() {
        const response = await fetch('questions.json');
        const data = await response.json();
        const selectedData = data.find((item) => item.subject === this.selectedSubject);
        this.questions = selectedData.questions;
        this.answers = Array(this.questions.length).fill(null);
        this.step = 'quiz';
      },
      // เลือกคำตอบสำหรับคำถามปัจจุบัน
      selectAnswer(option) {
        this.$set(this.answers, this.currentQuestionIndex, option);
      },
      // ไปยังคำถามถัดไป
      nextQuestion() {
        this.currentQuestionIndex++;
      },
      // ย้อนกลับไปยังคำถามก่อนหน้า
      prevQuestion() {
        this.currentQuestionIndex--;
      },
      // ตรวจสอบคะแนน
      checkAnswers() {
        this.score = this.questions.reduce((total, question, index) => {
          return total + (this.answers[index] === question.answer ? 1 : 0);
        }, 0);
        this.step = 'result';
      },
      // เริ่มใหม่
      restartQuiz() {
        this.step = 'start';
        this.selectedSubject = null;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = [];
        this.score = 0;
      },
    },
  });
  