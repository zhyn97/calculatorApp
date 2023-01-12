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

  let interimCalculations = [];
  let answer;
  let dividedByZero = 0;

  for (let i = 0; i < value.length; i += 1) {
    if (value[i] == "+" || value[i] == "-" || typeof value[i] == "number") {
      interimCalculations.push(value[i]);
    } else if (value[i] == "*") {
      let lastDigitOfQueue = interimCalculations.pop();
      let multiplication = lastDigitOfQueue * value[i + 1];
      interimCalculations.push(multiplication);
      i += 1;
    } else if (value[i] == "/") {
      if (value[i + 1] === 0) dividedByZero = 1;
      let lastDigitOfQueue = interimCalculations.pop();
      let division = lastDigitOfQueue / value[i + 1];
      interimCalculations.push(division);
      i += 1;
    }
  }

  answer = interimCalculations[0];

  for (let i = 1; i < interimCalculations.length; i = i + 2) {
    if (interimCalculations[i] == "+") {
      answer += interimCalculations[i + 1];
    } else {
      answer -= interimCalculations[i + 1];
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
  if (value.length > 1) {
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
  } else {
    addToQueue(input);
    let answer = value[0] / 100;
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
