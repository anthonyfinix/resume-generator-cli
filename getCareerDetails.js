const getMonthNames = require("./getMonthNames");
const { arrayPrompt } = require("./arrayPrompt");
const inquirer = require("inquirer");
const carrerPrompts = [
  {
    type: "list",
    name: "opportunityType",
    message: "Please select the opportunity type",
    choices: [
      "Full Time",
      "Part Time",
      "Internship",
      "Freelance",
      "Apprenticeship",
    ],
  },
  {
    type: "input",
    name: "establishmentName",
    message: "Please enter the establishment's name",
  },
  {
    type: "input",
    name: "designation",
    message: "Please enter your designation",
  },
  {
    type: "input",
    name: "establishmentAddress",
    message: "Please enter the establishment's full address",
  },
  {
    type: "date",
    name: "tenureStartingYear",
    message: "Please provide the starting year of the tenure",
  },
  {
    type: "list",
    name: "tenureStartingMonth",
    message: "Please provide the starting month of the tenure",
    choices: getMonthNames(),
  },
  {
    type: "number",
    name: "tenureStartingDay",
    message: "Please provide the starting day of the tenure",
    choices: getMonthNames(),
  },
  {
    type: "date",
    name: "tenureEndingYear",
    message: "Please provide the ending year of the tenure",
  },
  {
    type: "list",
    name: "tenureEndingMonth",
    message: "Please provide the ending month of the tenure",
    choices: getMonthNames(),
  },
  {
    type: "number",
    name: "tenureEndingDay",
    message: "Please provide the ending day of the tenure",
    choices: getMonthNames(),
  },
];
exports.getCareerDetails = async (experiences) => {
  await arrayPrompt({
    name: "careerMenuOption",
    message: "Enter points for the carrer",
    data: experiences,
    choiceLabel: [
      {
        label: "Add Experience",
        cb: async () => {
          const points = [];
          const singleCompanyData = await inquirer.prompt(carrerPrompts);
          await arrayPrompt({
            name: "points",
            message: "Enter a statement about your work",
            data: points,
            choiceLabel: [
              {
                label: "Add Point",
                cb: async () => {
                  const { point } = await inquirer.prompt({
                    type: "input",
                    name: "point",
                    message: "enter the point",
                  });
                  return point;
                },
              },
              {
                label: "Remove Point",
              },
            ],
            choicePromptName: "point",
          });
          return { ...singleCompanyData, points };
        },
      },
      { label: "Remove Experience" },
    ],
    choicePromptName: "establishmentName",
  });
};

exports.carrerPrompts;
