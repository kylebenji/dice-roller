//buttons
const btnRoll = document.querySelector(".roll");
const btnExpound = document.querySelector(".expound");

//elements
const input = document.querySelector(".dice");
const printout = document.querySelector(".printout");
const print = document.querySelector(".print");
const details = document.querySelector(".details");

let rollsActual = [];
const oneDieReg = /\d{1,2}d\d{1,3}/;

function parseOneRoll(rollInput) {
  dIndex = rollInput.indexOf("d");
  return [
    Number(rollInput.substring(0, dIndex)),
    Number(rollInput.substring(dIndex + 1, rollInput.length)),
  ];
}

function isValidRoll(rollInput) {
  return isValidOneDie(rollInput);
}

function isValidOneDie(die) {
  return oneDieReg.test(die);
}

function rollOneSizeDie(diceNumSize) {
  let rollsActual = [];
  let sum = 0;
  let dieSize = diceNumSize[1];
  let roll = 0;
  for (let i = 0; i < diceNumSize[0]; i++) {
    roll = Math.trunc(Math.random() * dieSize) + 1;
    sum += roll;
    rollsActual.push(`${roll} (d${dieSize})`);
  }
  return [sum, rollsActual];
}

function printRolls(rollsActual) {
  let out = `You rolled a ${rollsActual[0]}!!`;
  printout.classList.remove("hidden");
  print.textContent = out;
}

function printDetails(rollsActual) {
  let out = `You rolled a ${rollsActual[1][0]}`;
  console.log(rollsActual);
  for (let i = 1; i < rollsActual[1].length - 1; i++) {
    out += ", " + rollsActual[1][i];
  }
  if (rollsActual[1].length > 1)
    out += ", and a " + rollsActual[1][rollsActual[1].length - 1];
  details.textContent = out;
}

btnRoll.addEventListener("click", function () {
  let rollInput = input.value;
  printout.classList.add("hidden");
  details.classList.add("hidden");
  console.log(rollInput);
  if (isValidRoll(rollInput)) {
    let diceNumSize = parseOneRoll(rollInput);
    console.log(diceNumSize);
    rollsActual = rollOneSizeDie(diceNumSize);
    console.log(rollsActual);
    printRolls(rollsActual);
  }
});

btnExpound.addEventListener("click", function () {
  details.classList.remove("hidden");
  printDetails(rollsActual);
});
