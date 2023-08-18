const inquirer = require("inquirer");
const getMonthNames = require("./getMonthNames");
const getCareerDetails = async (experiences) => {
  let exitExperienceMenu = false;
  const menuOptions = ["Add Experience", "Remove Experience", "Done"];
  while (!exitExperienceMenu) {
    let academicQualificationAns = await inquirer.prompt({
      type: "list",
      name: "careerMenuOption",
      message: "Career opportunities",
      choices: menuOptions,
    });

    switch (academicQualificationAns.careerMenuOption) {
      case menuOptions[0]:
        let experienceDetails = await inquirer.prompt([
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
          {
            type: "input",
            name: "point1",
            message:
              "Please enter 1st point about your work & responsibilities",
          },
          {
            type: "input",
            name: "point2",
            message:
              "Please enter 2nd point about your work & responsibilities",
          },
          {
            type: "input",
            name: "point3",
            message:
              "Please enter 3rd point about your work & responsibilities",
          },
        ]);
        experiences.push(experienceDetails);
        break;
      case menuOptions[1]:
        let experienceName = await inquirer.prompt({
          type: "list",
          name: "removeExperience",
          message: "Select Experience to Delete",
          choices: [
            ...experiences.map((exp) => exp.establishmentName),
            "Cancel",
          ],
        });
        if (experienceName.removeExperience === "Cancel") break;
        let experienceIndex = experiences.findIndex(
          (exp) =>
            String(exp.establishmentName) ===
            String(experienceName.removeExperience)
        );
        experiences.splice(experienceIndex, 1);
        break;
      case menuOptions[2]:
        exitExperienceMenu = true;
        break;
    }
  }
};

module.exports = getCareerDetails;