var queue = [];
var input = 0;

document.getElementById("clear").onclick = (e) => {
  clearAll();
};

document.querySelector(".keypad-btns").onclick = (e) => {
  numericButton(e.target.value);
};

document.getElementById("evaluate").onclick = (e) => {
  calculateQueue(queue);
};

function addToQueue(input) {
  queue.push(input);
  console.log(queue);
}

function numericButton(arg) {
  if (
    document.getElementById("currentInput").innerHTML === "ERROR" ||
    (document.getElementById("currentInput").innerHTML == "0" && arg != ".")
  ) {
    document.getElementById("currentInput").innerHTML = "";
  }

  if (!(arg === ".") || !input.match(/[.]/)) {
    input += arg;
    document.getElementById("currentInput").innerHTML += arg;
    addToQueue(arg);
  }
}

function calculateQueue(value) {
  if (input !== 0) {
    input = parseFloat(input);

    addToQueue(input);
  }
  var answer = value[0];
  var dividedByZero = 0;
  for (var i = 2; i < value.length; i = i + 2) {
    switch (queue[i - 1]) {
      case "+":
        answer += value[i];
        break;
      case "-":
        answer -= value[i];
        break;
      case "/":
        if (value[i] === 0) dividedByZero = 1;
        else answer = answer / value[i];

        break;
      case "*":
        answer = answer * value[i];
        break;
    }
  }

  answer = answer.toFixed(10);
  answer = parseFloat(answer);
  if (dividedByZero === 1) {
    clearAll();
    document.getElementById("currentInput").innerHTML = "ERROR";
  } else {
    document.getElementById("currentInput").innerHTML = answer;
    input = answer;
    queue = [];
  }
}

function clearAll() {
  queue = [];
  input = 0;
  document.querySelector(".currentInput").innerHTML = "0";
}
