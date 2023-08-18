const inquirer = require("inquirer");
const getResumeSpecificData = async () => {
  let resumeSpecificData = await inquirer.prompt([
    {
      type: "input",
      name: "expectation",
      message: "What is your expectation from the company & job posting ?",
    },
    {
      type: "input",
      name: "caption",
      message: "Write a one liner caption for yourself",
    },
  ]);
  return resumeSpecificData;
};
module.exports = getResumeSpecificData;
