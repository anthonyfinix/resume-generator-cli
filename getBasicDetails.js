const inquirer = require("inquirer");
const getMonthNames = require("./getMonthNames");
const basicDetailsPrompt = require("./getBasicDetails/prompts");
const getBasicDetails = async () => {
  let basicDetails = await inquirer.prompt([
    {
      type: "input",
      name: "candidateName",
      message: "What is your full name ?",
    },
    {
      type: "input",
      name: "candidateEmailAddress",
      message: "What is your email address ?",
    },
    {
      type: "input",
      name: "candidateContactNumber",
      message: "What is your contact number ?",
    },
    {
      type: "number",
      name: "candidateBirthYear",
      message: "What is your age ?",
    },
    {
      type: "list",
      name: "candidateBirthMonth",
      message: "What is your birth month ?",
      choices: getMonthNames(),
    },
    {
      type: "number",
      name: "candidateBirtDay",
      message: "Day on which you were born ?",
    },
    {
      type: "input",
      name: "candidatePresentAddress",
      message: "Please type your present full address",
    },
    {
      type: "input",
      name: "candidatePermanentAddress",
      message: "Please type your permanent full address",
    },
    {
      type: "input",
      name: "candidateLanguage",
      message: "Candidate's proficient languages (comma seperated)",
    },
  ]);
  return basicDetails;
};
module.exports = getBasicDetails;
