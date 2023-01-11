let queue = [];
let input = 0;

document.getElementById("evaluate").onclick = () => {
  checkResult(queue);
};

document.getElementById("clear").onclick = () => {
  clearAll();
};

document.getElementById("percent").onclick = () => {
  checkPercentResult(queue);
};

document.querySelectorAll(".num_btn").forEach((el) => {
  el.onclick = (e) => {
    numericButton(e.target.value);
  };
});

document.querySelectorAll(".fun_btn").forEach((el) => {
  el.onclick = (e) => {
    operatorButton(e.target.value);
  };
});

function calculate(value) {
  if (input !== 0) {
    input = parseFloat(input);

    addToQueue(input);
  }
  let answer = value[0];
  let dividedByZero = 0;

  for (let i = 2; i < value.length; i = i + 2) {
    switch (queue[i - 1]) {
      case "*":
        answer = answer * value[i];
        break;
      case "/":
        if (value[i] === 0) dividedByZero = 1;
        else answer = answer / value[i];
        break;
      case "+":
        answer += value[i];
        break;
      case "-":
        answer -= value[i];
        break;
    }
  }
  return {
    answer: answer,
    dividedByZero: dividedByZero,
  };
}

function roundPlus(x, n = 8) {
  if (isNaN(x) || isNaN(n)) return false;
  var m = Math.pow(10, n);
  return Math.round(x * m) / m;
}

function checkResult(value) {
  let result = calculate(value);
  let answer = result.answer;
  let dividedByZero = result.dividedByZero;

  answer = roundPlus(answer);
  if (dividedByZero === 1) {
    clearAll();
    document.getElementById("answerScreen").innerHTML = "ERROR";
  } else {
    document.getElementById("answerScreen").innerHTML = answer;
    input = answer;
    queue = [];
  }
}

function checkPercentResult(value) {
  let result = calculate(value);
  let answer = result.answer;
  let dividedByZero = result.dividedByZero;

  answer = answer / 100;
  if (dividedByZero === 1) {
    clearAll();
    document.getElementById("answerScreen").innerHTML = "ERROR";
  } else {
    document.getElementById("answerScreen").innerHTML = answer;
    input = answer;
    queue = [];
  }
}

function addToQueue(input) {
  queue.push(input);
}

function clearAll() {
  queue = [];
  input = 0;
  document.getElementById("answerScreen").innerHTML = "0";
}

function numericButton(arg) {
  if (
    document.getElementById("answerScreen").innerHTML === "ERROR" ||
    (document.getElementById("answerScreen").innerHTML == "0" && arg != ".")
  ) {
    document.getElementById("answerScreen").innerHTML = "";
  }

  if (!(arg === ".") || !input.match(/[.]/)) {
    input += arg;
    document.getElementById("answerScreen").innerHTML += arg;
  }
}

function operatorButton(arg) {
  if (input !== 0 && input !== "-") {
    input = parseFloat(input);
    addToQueue(input);
    addToQueue(arg);
    document.getElementById("answerScreen").innerHTML += arg;
    input = 0;
  }
  if (arg == "-" && isNaN(queue[0]) && input !== "-") {
    input = "-";

    document.getElementById("answerScreen").innerHTML = "-";
  }
}
