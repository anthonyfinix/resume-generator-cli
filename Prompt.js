const inquirer = require("inquirer");
const { arrayPrompt } = require("./arrayPrompt");

async function Prompt(prompts) {
  let answers = {};
  for (let question of prompts) {
    if (question.type === "arrayPrompt") {
      answers = {
        ...answers,
        [question.name]: await arrayPrompt({
          name: question.name,
          message: question.message,
          data: question.data,
          choiceLabel: question.choice,
          choicePromptName: question.choicePromptName,
        }),
      };
    } else {
      answers = { ...answers, ...(await inquirer.prompt(question)) };
    }
  }
  return answers;
}

module.exports = Prompt;
