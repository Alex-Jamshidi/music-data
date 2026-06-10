import { getUserIDs, getSong, getListenEvents } from "./data.mjs";

// ======================================================
// ----- DOMS
// ======================================================
const userSelect = document.getElementById("user-select");
const questionContainer = document.getElementById("question-container");

// ======================================================
// ----- Setup and Render
// ======================================================
const users = getUserIDs();
let currentUserId;
let questionsAll;

function setup() {
  userSelect.value = "";
  render();
}

function render() {
  if (!users.includes(currentUserId)) return;
  computeAnswers();
  displayQuestions();
}

// ======================================================
// ----- Front End
// ======================================================

// Checks for change of user
userSelect.addEventListener("change", function (option) {
  currentUserId = userSelect.value;
  render();
});

// Creates and display all questions/answers
export function displayQuestions() {
  const questionElements = questionsAll.map(createQuestion);
  questionContainer.replaceChildren(...questionElements);
}

// Creates single question/answer clone fragment
function createQuestion(item) {
  const template = document.getElementById("question-template");
  const clone = template.content.cloneNode(true);

  clone.querySelector(".question-item").textContent = item.question;
  clone.querySelector(".answer-item").textContent = item.answer;

  return clone;
}

// ======================================================
// ----- Back End
// ======================================================

export function computeAnswers() {
  questionsAll = [
    { question: "question 1?", answer: "answer 1" },
    { question: "question 2?", answer: "answer 2" },
    { answer: "answer without question" },
  ];
  return;
}

// ======================================================
// ----- Page Loader
// ======================================================
window.onload = setup;
