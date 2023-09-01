const CHOICES = [
  {
    name: "rock",
    beats: "scissors",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "paper",
    beats: "rock",
  },
];

const modal = document.querySelector(".modal");
const openBtn = document.querySelector(".btn-open");
const closeBtn = document.querySelector(".btn-close");
const nextPage = document.querySelector(".hurray");
const hurrayPlayAgainBtn = document.getElementById("hurray-play-again");
const scoreArea = document.querySelector(".score_area");
const choiceBtn = document.querySelectorAll(".choice");
const areaDiv = document.querySelector(".area");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".result");

const resultWinner = document.querySelector(".results_winner");
const resultText = document.querySelector(".results_text");

const playAgainBtn = document.querySelector(".play-again-button");
const nextBtn = document.querySelector(".next-btn");

let humanScore = parseInt(localStorage.getItem("humanScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

const openModal = function () {
  modal.classList.remove("hidden");
};

openBtn.addEventListener("click", openModal);

const closeModal = function () {
  modal.classList.add("hidden");
};
closeBtn.addEventListener("click", closeModal);

choiceBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
            <div class="game ${results[idx].name}">
            <img src="./images/${results[idx].name}.png"/>
            </div>`;
    }, idx * 1000);
  });
  areaDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());
    if (userWins) {
      resultText.innerText = "YOU WIN AGAINST PC";
      resultDivs[0].classList.toggle("winner");
      nextBtn.style.display = "block";
      humanScore++;
    } else if (aiWins) {
      resultText.innerText = "YOU LOST AGAINST PC";
      resultDivs[1].classList.toggle("winner");
      nextBtn.style.display = "none";
      computerScore++;
    } else {
      resultText.innerText = "TIE UP";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
    localStorage.setItem("humanScore", humanScore);
    localStorage.setItem("computerScore", computerScore);
    document.getElementById("human-score").textContent = `${humanScore}`;
    document.getElementById("computer-score").textContent = `${computerScore}`;
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

playAgainBtn.addEventListener("click", () => {
  areaDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });
  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
  nextBtn.style.display = "none";
});
nextBtn.addEventListener("click", () => {
  areaDiv.classList.add("hidden");
  resultsDiv.classList.toggle("hidden");

  nextPage.classList.toggle("hidden");
  openBtn.classList.toggle("hidden");
  nextBtn.style.display = "none";
  scoreArea.classList.toggle("hidden");
});
hurrayPlayAgainBtn.addEventListener("click", () => {
  areaDiv.classList.remove("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });
  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
  nextPage.classList.add("hidden");
  openBtn.classList.remove("hidden");
  nextBtn.style.display = "none";
  scoreArea.classList.remove("hidden");
});
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("human-score").textContent = `${humanScore}`;
  document.getElementById("computer-score").textContent = `${computerScore}`;
});
