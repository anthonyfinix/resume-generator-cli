const inquirer = require("inquirer");
const resumeSpecificPrompts = [
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
];
const getResumeSpecificDetails = async (data, promptName) => {
  let resumeSpecificData = { ...data };
  let prompts = [];
  if (resumeSpecificData && promptName) {
    prompts = resumeSpecificPrompts.filter(
      (resumeDetails) => resumeDetails.name === promptName
    );
  } else {
    prompts = [...resumeSpecificPrompts];
  }
  let answers = await inquirer.prompt(prompts);
  if (resumeSpecificData && promptName) {
    resumeSpecificData[promptName] = answers[promptName];
    return resumeSpecificData;
  } else {
    return answers;
  }
};
exports.resumeSpecificPrompts = resumeSpecificPrompts;
exports.getResumeSpecificDetails = getResumeSpecificDetails;
