const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const getBirthYearFromAge = require("./getBirthYearFromAge");
const outPath = path.join(__dirname, "dist", "output.pdf");
const {
  updateBasicDetails,
  basicDetailsPrompt,
} = require("./updateBasicDetails");
const { getAcademicDetails } = require("./getAcademicDetails");
const { getCareerDetails } = require("./getCareerDetails");
const { getResumeSpecificDetails } = require("./getResumeSpecificDetails");
const getPdfBuffer = require("./getPdfBuffer");
const { getCache, saveCache } = require("./cacheCandidateData");

let candidateData = {
  academicQualifications: [],
  experiences: [],
};
let exitMainMenu = false;

const mainOptions = [
  "Add Basic Details",
  "Add Resume Specific Details",
  "Add or Remove Academic Details",
  "Add or Remove Career Details",
  "Cache Data",
  "Display Candidate Data",
  "Generate PDF",
  "Exit",
];
(async () => {
  try {
    candidateData = await getCache();
  } catch (e) {
    if (e.code !== "ENOENT") console.log(e);
  }
  if (candidateData.basicDetails) {
    mainOptions.splice(0, 1);
    mainOptions.splice(0, 0, "Update Basic Details");
  }
  while (!exitMainMenu) {
    let { answer } = await inquirer.prompt({
      type: "list",
      name: "answer",
      message: "Resume Generator",
      choices: mainOptions,
    });
    switch (answer) {
      case "Add Basic Details":
        candidateData.basicDetails = await updateBasicDetails();
        mainOptions.splice(0, 1);
        mainOptions.splice(0, 0, "Update Basic Details");
        saveCache(candidateData);
        break;
      case "Update Basic Details":
        const { basicUserDetailsUpdatedValues } = await inquirer.prompt({
          type: "list",
          name: "basicUserDetailsUpdatedValues",
          message: "What value would you like to update",
          choices: Object.values(
            basicDetailsPrompt.map(({ message }) => message)
          ),
        });
        const updatedCandidateBasicDetails = await updateBasicDetails(
          candidateData.basicDetails,
          basicDetailsPrompt.reduce((str, curr) => {
            if (curr.message === basicUserDetailsUpdatedValues) str = curr.name;
            return str;
          }, "")
        );
        candidateData.basicDetails = updatedCandidateBasicDetails;
        break;
      case "Add or Remove Academic Details":
        await getAcademicDetails(candidateData.academicQualifications);
        saveCache(candidateData);
        break;
      case "Add or Remove Career Details":
        await getCareerDetails(candidateData.experiences);
        saveCache(candidateData);
        break;
      case "Add Resume Specific Details":
        candidateData.resumeSpecificDetails = await getResumeSpecificDetails();
        saveCache(candidateData);
        break;
      case "Cache Data":
        saveCache(candidateData);
        break;
      case "Display Candidate Data":
        console.warn("Basic Details");
        console.table(candidateData.basicDetails);
        console.warn("Resume Specific Details");
        console.table(candidateData.resumeSpecificDetails);
        console.warn("Experiences");
        if (candidateData.experiences?.length) {
          candidateData.experiences.forEach((exp) => {
            const { points, ...rest } = exp;
            console.table(rest);
          });
        }
        console.warn("Academic Details");
        if (candidateData.academicQualifications?.length) {
          candidateData.academicQualifications.forEach((exp) =>
            console.table(exp)
          );
        }
        break;
      case "Generate PDF":
        try {
          let pdf = await getPdfBuffer(candidateData);
          await fs.promises.writeFile(outPath, pdf);
        } catch (e) {
          console.log(e);
        }
        break;
      case "Exit":
        exitMainMenu = true;
    }
  }
})();
