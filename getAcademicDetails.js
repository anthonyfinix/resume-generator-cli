const { arrayPrompt } = require("./arrayPrompt");
const inquirer = require("inquirer");
const educationLevel = [
  "Primary Education",
  "Secondary Education",
  "Higher Secondary or High School Education",
  "Undergraduate Education",
  "Graduate Education",
  "Doctoral or Postgraduate Education",
  "Other",
];
const academicPrompts = [
  {
    type: "list",
    name: "educationLevel",
    message: "Choose the level of education",
    choices: educationLevel,
  },
  {
    type: "input",
    name: "academyName",
    message: "Please enter the academy's name",
  },
  {
    type: "input",
    name: "academyAddress",
    message: "Please enter the academy's full address",
  },
  {
    type: "input",
    name: "academyStartingYear",
    message: "Please provide the starting year of the academy",
  },
  {
    type: "input",
    name: "academyEndingYear",
    message: "Please provide the ending year of the academy",
  },
];
exports.getAcademicDetails = async (academicQualifications) => {
  await arrayPrompt({
    name: "academicQualificationOption",
    message: "Academic Qualification",
    data: academicQualifications,
    choiceLabel: [
      {
        label: "Add Academic Qualification",
        cb: () => inquirer.prompt(academicPrompts),
      },
      { label: "Remove Academic Qualification" },
    ],
    choicePromptName: "academyName",
  });
};
exports.academicPrompts;
exports.educationLevel;
