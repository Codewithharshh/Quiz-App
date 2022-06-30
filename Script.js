let startQuizbtn = document.querySelector('.start-quiz-btn');
let container = document.querySelector('.container');
let question = document.querySelector('.ques-text');
let option_list = document.querySelector(".option-div");
let time_line= document.querySelector(".time_line");
let next_ques_btn = document.querySelector('.next-ques-btn');
let topQuestionCounting = document.querySelector('.question-counter');

let question_count = 0;
let ques_number = 1;

startQuizbtn.addEventListener('click', () => {
    container.style.display = 'block';
    showQuestions(0);
    QuestionCounter(1)
});

//If next btn click
next_ques_btn.onclick = ()=>{
if(question_count < questions.length - 1){      
question_count++;
ques_number++;
showQuestions(question_count);
QuestionCounter(ques_number);
}else{
console.log('Quiz Complete')
}
};


//Getting question and options from array
function showQuestions(index){
let question_tag =  `<span>`+questions[index].number + ". " + questions[index].question+`</span>`;
let option_tag =  `<div class="option"><span>`+questions[index].options[0]+`</span></div>`+
              `<div class="option"><span>`+questions[index].options[1]+`</span></div>`+
         `<div class="option"><span>`+questions[index].options[2]+`</span></div>`+
         `<div class="option"><span>`+questions[index].options[3]+`</span></div>`;
question.innerHTML = question_tag;
option_list.innerHTML = option_tag;
const option = option_list.querySelectorAll('.option');
for(i=0;i<option.length;i++){
option[i].setAttribute('onclick','optionSelect(this)');  
}
}

function optionSelect(answer){
 const user_answer = answer.textContent;
 let correctAns = questions[question_count].answer;
if(user_answer == correctAns){
 console.log('Answer Correct');
}else{
 console.log('Answer Incorrect')
}
};

//Show Ques No On Top
function QuestionCounter(index){
let totalQuesCount =  `<span>`+index+`<span> of </span><span>`+questions.length+`</span> Question</span>`;
topQuestionCounting.innerHTML = totalQuesCount;
}

