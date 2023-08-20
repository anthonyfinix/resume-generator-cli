const inquirer = require("inquirer");
const getAcademicDetails = async (academicQualifications) => {
  let exitAcademicQualificationMenu = false;
  const menuOptions = [
    "Add Academic Qualification",
    "Remove Academic Qualification",
    "Done",
  ];
  const educationLevel = [
    "Primary Education",
    "Secondary Education",
    "Higher Secondary or High School Education",
    "Undergraduate Education",
    "Graduate Education",
    "Doctoral or Postgraduate Education",
    "Other",
  ];
  while (!exitAcademicQualificationMenu) {
    let academicQualificationAns = await inquirer.prompt({
      type: "list",
      name: "academicQualificationOption",
      message: "Academic Qualification",
      choices: menuOptions,
    });
    switch (academicQualificationAns.academicQualificationOption) {
      case menuOptions[0]:
        let academicDetails = await inquirer.prompt([
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
        ]);
        academicQualifications.push(academicDetails);
        break;
      case menuOptions[1]:
        let academyName = await inquirer.prompt({
          type: "list",
          name: "removeAcademicDetail",
          message: "Select Academic Details to Delete",
          choices: [
            ...academicQualifications.map(
              (academicDetail) => academicDetail.academyName
            ),
            "Cancel",
          ],
        });
        if (academyName.removeAcademicDetails === "Cancel") break;
        let academyIndex = academicQualifications.findIndex(
          (academy) =>
            String(academy.academyName) ===
            String(academyName.removeAcademicDetail)
        );
        academicQualifications.splice(academyIndex, 1);
        break;
      case "Done":
        exitAcademicQualificationMenu = true;
        break;
    }
  }
};

module.exports = getAcademicDetails;
