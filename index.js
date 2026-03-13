let boxes = document.querySelectorAll(".Box");
let resetbtn = document.querySelector("#Reset-btn");
let newGamebtn = document.querySelector("#btn-new-game");
let msgContainer = document.querySelector("#Winning-msg");
let msgWinnerText = document.querySelector("#winner-player-h1");

let Turn_X = true;
let moveCount = 0;

const Winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    moveCount++;

    if (Turn_X) {
      box.innerText = "X";
      box.style.color = "black";

      document.querySelector("#Chance-indicator-X").style.backgroundColor =
        "black";
      document.querySelector("#Chance-indicator-O").style.backgroundColor =
        "rgb(66,222,66)";

      Turn_X = false;
    } else {
      box.innerText = "O";

      document.querySelector("#Chance-indicator-X").style.backgroundColor =
        "rgb(66,222,66)";
      document.querySelector("#Chance-indicator-O").style.backgroundColor =
        "black";

      Turn_X = true;
    }

    box.disabled = true;
    box.style.backgroundColor = "red";

    checkWinner();
  });
});

const resetGame = () => {
  Turn_X = true;
  moveCount = 0;

  enableBoxes();

  document.querySelector("#Chance-indicator-X").style.backgroundColor =
    "rgb(66,222,66)";
  document.querySelector("#Chance-indicator-O").style.backgroundColor = "black";

  msgContainer.classList.add("hide");
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "greenyellow";
  }
};

const ShowWinner = (winner) => {
  msgWinnerText.innerText = `Player :- ${winner}`;
  msgContainer.classList.remove("hide");

  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of Winpattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        ShowWinner(pos1);
        return;
      }
    }
  }

  if (moveCount === 9) {
    msgWinnerText.innerText = "Match Draw";
    msgContainer.classList.remove("hide");
  }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
