let startQuizbtn = document.querySelector('.start-quiz-btn');
let container = document.querySelector('.container');
let question = document.querySelector('.ques-text');
let option_list = document.querySelector(".option-div");
let time_line= document.querySelector(".time_line");
let TimeCount = document.querySelector('.time-left');
let next_ques_btn = document.querySelector('.next-ques-btn');
let topQuestionCounting = document.querySelector('.question-counter');
const result = document.querySelector('.result-div');
let play_again_btn = document.querySelector('.replay-quiz-btn');

let correctIcon = '  <div class="icon correct-icon"><i class="fa-solid fa-check"></i></div>';
let incorrectIcon = '  <div class="icon wrong-icon"><i class="fa-solid fa-xmark"></i></div>';

//Question Count
let question_count = 0;
//Top Bar Question Count
let ques_number = 1
let timeValue = 15;
let widthValue = 0;
let score = 0;
let count;
let countLine;

//If Start Quiz Btn
startQuizbtn.addEventListener('click', () => {
    container.style.display = 'block';
    showQuestions(0);
    QuestionCounter(1);
    timerStart(15);
    timerLine(0);
    startQuizbtn.style.display = 'none';
});

//If next btn click
next_ques_btn.onclick = ()=>{
if(question_count < questions.length - 1){      
question_count++;
ques_number++;
showQuestions(question_count);
QuestionCounter(ques_number);
clearInterval(count);
timerStart(timeValue);
clearInterval(countLine);
timerLine(widthValue);
next_ques_btn.classList.add('click-disable');
}else{
console.log('Quiz Complete')
showResult();
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
for(let i=0;i<option.length;i++){
option[i].setAttribute('onclick','optionSelect(this)'); 
}
}

//If User Select Question
function optionSelect(answer){
 clearInterval(count);
 clearInterval(countLine);
 const user_answer = answer.textContent;
 let correctAns = questions[question_count].answer;
 let Alloption = option_list.children.length;
 if(user_answer == correctAns){
 score += 1;       
 answer.classList.add("correct");
 answer.insertAdjacentHTML("beforeend",correctIcon);
}else{
  answer.classList.add("incorrect");
  answer.insertAdjacentHTML("beforeend",incorrectIcon);
  for(i=0;i<Alloption;i++){
if(option_list.children[i].textContent == correctAns){
  option_list.children[i].setAttribute("class","option correct");  
  option_list.children[i].insertAdjacentHTML("beforeend",correctIcon);
}       
  }
}

//If User Select Option Then All Option Disabled
for(let i=0;i < Alloption;i++){
option_list.children[i].classList.add('disabled');  
}
next_ques_btn.classList.remove('click-disable');
};

//Show Ques No On Top
function QuestionCounter(index){
let totalQuesCount =  `<span>`+index+`<span> of </span><span>`+questions.length+`</span> Question</span>`;
topQuestionCounting.innerHTML = totalQuesCount;
};

//Timer Start
function timerStart(time){
  count = setInterval(timer,1000)  
 function timer(){
TimeCount.innerHTML = time;  
time--;
if(time < 9){
TimeCount.textContent = "0" + TimeCount.textContent;    
}
if(time < 0){
clearInterval(count);      
TimeCount.innerHTML = "00"; 

let correctAns = questions[question_count].answer;
let Alloption = option_list.children.length;

for(i = 0; i < Alloption; i++){
 if(option_list.children[i].textContent == correctAns){
    option_list.children[i].setAttribute("class", "option correct");
    option_list.children[i].insertAdjacentHTML("beforeend", correctIcon);
        }
};
for(let i = 0; i < Alloption; i++){
 option_list.children[i].classList.add('disabled');
}
next_ques_btn.classList.remove('click-disable');
}
}
 }

//Time Line
function timerLine(time){
  countLine = setInterval(timer,40)  
 function timer(){
time += 1;
time_line.style.width = time + "px";
if(time > 399){
clearInterval(countLine);      
}
 };
};

//Show Result

function showResult(){
container.style.display = 'none';
result.style.display = 'block';
let scoreText = document.querySelector('.score');
if(score > 3){
let scoreTag = `<span>Congrats! You scored `+score+` out of `+questions.length+` 🔥</span>`;  
scoreText.innerHTML = scoreTag;
}else if(score > 1){
let scoreTag = `<span>Nice! You scored ` + score + ` out of ` + questions.length + ` 🔥</span>`;
scoreText.innerHTML = scoreTag;       
}else{
let scoreTag = `<span>Sorry! You scored `+score+` out of `+questions.length+` 🔥</span>`;  
scoreText.innerHTML = scoreTag;       
}
};

