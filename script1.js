function showSection(id){
  document.querySelectorAll('.section').forEach(s=>s.style.display='none');
  document.getElementById(id).style.display='block';
}

const signupForm=document.getElementById('signupForm');
signupForm.addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('signupName').value;
  const email=document.getElementById('signupEmail').value;
  const username=document.getElementById('signupUsername').value;
  const password=document.getElementById('signupPassword').value;
  localStorage.setItem('user',JSON.stringify({name,email,username,password}));
  document.getElementById('signupMsg').innerText="✅ Sign Up Successful! Login now.";
  signupForm.reset();
});

const loginForm=document.getElementById('loginForm');
loginForm.addEventListener('submit',e=>{
  e.preventDefault();
  const username=document.getElementById('loginUsername').value;
  const password=document.getElementById('loginPassword').value;
  const user=JSON.parse(localStorage.getItem('user'));
  if(user && user.username===username && user.password===password){
    document.getElementById('loginMsg').innerText=`✅ Welcome ${user.name}!`;
    showSection('quiz');
  }else{
    document.getElementById('loginMsg').innerText="❌ Invalid credentials!";
  }
  loginForm.reset();
});

const quiz=[
  {q:"What does HTML stand for?", o:["Hyper Text Markup Language","High Text Machine Language","Home Tool Markup Language"], a:0},
  {q:"Which language is used for styling?", o:["HTML","CSS","JavaScript"], a:1},
  {q:"JavaScript is used for?", o:["Styling","Logic","Structure"], a:1}
];

let index=0, score=0;

function loadQuestion(){
  const q=quiz[index];
  document.getElementById("question").innerText=q.q;
  const options=document.getElementById("options");
  options.innerHTML="";
  q.o.forEach((opt,i)=>{
    const div=document.createElement("div");
    div.className="option";
    div.innerText=opt;
    div.onclick=()=>checkAnswer(div,i);
    options.appendChild(div);
  });
}

function checkAnswer(el,i){
  const options=document.querySelectorAll(".option");
  options.forEach(opt=>opt.classList.add("disabled"));
  if(i===quiz[index].a){
    el.classList.add("correct");
    score++;
    document.getElementById("feedback").innerText="Correct ✔";
  }else{
    el.classList.add("wrong");
    options[quiz[index].a].classList.add("correct");
    document.getElementById("feedback").innerText="Wrong ✖";
  }
}

function nextQuestion(){
  index++;
  document.getElementById("feedback").innerText="";
  if(index<quiz.length) loadQuestion();
  else document.getElementById("quiz").innerHTML=`<h1>🎉 Final Score</h1><h2>${score}/${quiz.length}</h2><button onclick="restartQuiz()">Restart Quiz</button>`;
}

function restartQuiz(){
  index=0; score=0;
  showSection('quiz');
  loadQuestion();
}

loadQuestion();
