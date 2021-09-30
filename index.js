const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeAsync = util.promisify(fs.writeFile);

const question = [
  {
    type: "input",
    name: "title",
    message: "What is the project title?",
  },
  {
    type: "input",
    name: "body",
    message: "Write a short description about your project: ",
  },
  {
    type: "input",
    name: "prerequisite",
    message:
      "What is needed to run your project? ie. install process, other programs or prerequisites: ",
  },
  {
    type: "input",
    name: "project",
    message: "Who is the main target of this project? Describe: ",
  },
  {
    type: "list",
    name: "license",
    message: "What is the license used on this project?: ",
    choices: ["Apache", "Academic", "GNU", "ISC", "MIT", "Mozilla", "Open"],
  },
  {
    type: "input",
    name: "author",
    message: "Who authored this project?: ",
  },
  {
    type: "input",
    name: "testing",
    message: "How did you test this project?: ",
  },
  {
    type: "input",
    name: "questions",
    message: "Who do I contact if I have an issue?: ",
  },
  {
    type: "input",
    name: "username",
    message: "Enter your GitHub username: ",
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email: ",
  },
];

function start() {
  inquirer
    .prompt(question)
    .then((response) => writeAsync("README.md", fillContent(response)))
    .then(() => console.log("success!"));
}

const fillContent = function (response) {
  const fillRead = `
  # Title: ${response.title}
  ## Table of Contents
  1.[Description](#description)</br>
  2.[Installation](#installation)</br>
  3.[Usage](#usage)</br>
  4.[Contributors](#contributors)</br>
  5.[Testing Info](#testing)</br>
  6.[License Info](#license)</br>
  7.[Questions](#questions)</br>  


  # <span id="desc"></span>
  # Project Description: 
  ${response.body}
  # <span id="installation"></span>
  # PreRequisites and Install Info:
  ${response.prerequisite}
  # <span id="usage"></span>
  # Usage:
  ${response.project}
  # <span id="contributors"></span>
  # Contributors:
  ${response.author}
  # <span id="testing"></span>
  # Testing Info: 
  ${response.testing}
  # <span id="license"></span>
  # License:
  ${response.license}
  # <span id="questions"></span>
  # Questions:
  Name: ${response.questions}  
  Email: ${response.email}  
  Github: [${response.username}](www.github.com/${response.username})  
  `;
  return fillRead;
};

start();
