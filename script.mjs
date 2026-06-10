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
let questionsAll = [
  { question: "question 1?", answer: "answer 1" },
  { question: "question 2?", answer: "answer 2" },
  { answer: "answer without question" },
];

function setup() {
  userSelect.value = "";
  render();
}

function render() {
  displayQuestions();
  if (!users.includes(currentUserId)) return;
}

// ======================================================
// ----- Front End
// ======================================================

export function displayQuestions() {
  const questionElements = questionsAll.map(createQuestion);
  questionContainer.replaceChildren(...questionElements);
}

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

// ======================================================
// ----- Page Loader
// ======================================================
window.onload = setup;
