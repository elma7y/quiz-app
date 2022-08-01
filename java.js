let question = document.querySelector(".quizarea h2");
let answerDiv = document.querySelector(".answers-area");
let bulletsContainer = document.querySelector(".bullets .spans");
let submitButton = document.querySelector(".submitbutton");
let resultDiv = document.querySelector(".results");
let numberOfQuestions = document.querySelector(".conut span");
let h2Div = document.querySelector(".quizarea");
let countsdownsss = document.querySelector(".countdown");
let bulletsDiv = document.querySelector(".bullets");
let currentQuestion = 0;
let rightanswes = 0;
let changebulletcolors = 0;
let countdowntimer;
function getQuestions() {
  fetch("json/questions.json")
    .then((response) => response.json())
    .then((questionsAndAnswers) => {
      createBullets(questionsAndAnswers.length);
      addQuestionData(
        questionsAndAnswers[currentQuestion],
        questionsAndAnswers.length
      );
      countDown(30, 12);
      submitButton.onclick = () => {
        let rightAnswer = questionsAndAnswers[currentQuestion].right_answer;
        currentQuestion++;
        checkAnswer(rightAnswer, questionsAndAnswers.length);
        question.innerHTML = "";
        answerDiv.innerHTML = "";
        addQuestionData(
          questionsAndAnswers[currentQuestion],
          questionsAndAnswers.length
        );
        changeBullets();
        clearInterval(countdowntimer);
        countDown(30, 12);
        showresults(questionsAndAnswers.length);
        console.log(rightAnswer);
      };
    });
}
getQuestions();
function createBullets(num) {
  numberOfQuestions.innerHTML = num;
  for (i = 0; i < num; i++) {
    let bulletSpan = document.createElement("span");
    let bulletSpanText = document.createTextNode(`${i + 1}`);
    bulletSpan.appendChild(bulletSpanText);
    if (i === 0) {
      bulletSpan.className = "on";
    }
    bulletsContainer.appendChild(bulletSpan);
  }
}
function addQuestionData(obj, currentQ) {
  if (currentQuestion < currentQ) {
    question.innerHTML = obj.title;
    for (let i = 1; i <= 4; i++) {
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";
      let radioInput = document.createElement("input");
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];
      if (i === 1) {
        radioInput.checked = true;
      }
      let theLabel = document.createElement("label");
      theLabel.htmlFor = `answer_${i}`;
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);
      theLabel.appendChild(theLabelText);
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);
      answerDiv.appendChild(mainDiv);
    }
  }
}
function checkAnswer(ranswer, count) {
  let chosenanswer;
  let allradio = document.querySelectorAll("input");
  let allabels = document.querySelectorAll("label");
  for (i = 0; i < 4; i++) {
    if (allradio[i].checked) {
      chosenanswer = allradio[i].dataset.answer;
    }
  }
  if (ranswer === chosenanswer) {
    rightanswes++;
  }
}
function changeBullets() {
  if (currentQuestion < 12) {
    let allBulletsSpans = document.querySelectorAll(".bullets .spans span");
    allBulletsSpans[changebulletcolors].classList.remove("on");
    changebulletcolors++;
    allBulletsSpans[changebulletcolors].classList.add("on");
  }
}
function showresults(count) {
  if (currentQuestion === count) {
    h2Div.remove();
    answerDiv.remove();
    submitButton.remove();
    bulletsDiv.remove();
    countsdownsss.remove();
    if (rightanswes < count && rightanswes > count / 2) {
      resultDiv.innerHTML = `<span class = "good"> Good </span> you answered <span class = "goodno">${rightanswes}</span> from <span class = "perfect">${count}</span>`;
    } else if (rightanswes === count) {
      resultDiv.innerHTML = `<span class = "perfect"> perfect </span> you answered <span class = "perfectno">${rightanswes}</span> from <span class = "perfect">${count}</span>`;
    } else {
      resultDiv.innerHTML = `<span class = "bad"> bad </span> you answered <span class ="badno">${rightanswes}</span> from <span class = "perfect">${count}</span>`;
    }
    resultDiv.style.padding = "40px";
    resultDiv.style.fontSize = "25px";
    resultDiv.style.backgroundColor = "white";
    resultDiv.style.display = "flex";
    resultDiv.style.justifyContent = "center";
    resultDiv.style.alignItems = "center";
  }
}
function countDown(duration, count) {
  if (currentQuestion < count) {
    let minutes;
    let seconds;
    countdowntimer = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      countsdownsss.innerHTML = `${minutes} : ${seconds}`;
      if (--duration < 0) {
        clearInterval(countdowntimer);
        submitButton.click();
      }
    }, 1000);
  }
}
