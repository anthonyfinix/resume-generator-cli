const inquirer = require("inquirer");

exports.arrayPrompt = async ({
  name,
  message,
  data,
  choiceLabel,
  addPrompt,
  choicePromptName,
}) => {
  let exitPoint = false;
  while (!exitPoint) {
    const answer = await inquirer.prompt({
      type: "list",
      name,
      message,
      choices: [choiceLabel[0], choiceLabel[1], "Done"],
    });
    switch (answer[name]) {
      case choiceLabel[0]:
        let answer = await inquirer.prompt(addPrompt);
        data.push(answer);
        break;
      case choiceLabel[1]:
        let { remove } = await inquirer.prompt({
          type: "list",
          name: "remove",
          message: "Select the item to remove",
          choices: [...data.map((item) => item[choicePromptName]), "cancel"],
        });
        if (remove === "cancel") break;
        const index = data.findIndex((el) => el.choicePromptName === remove);
        data.splice(index, 1);
        break;
      case `Done`:
        exitPoint = true;
        break;
    }
  }
};
