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
const {
  getResumeSpecificDetails,
  resumeSpecificPrompts,
} = require("./getResumeSpecificDetails");
const getPdfBuffer = require("./getPdfBuffer");
const { getCache, saveCache } = require("./cacheCandidateData");
const { arrayPrompt } = require("./arrayPrompt");

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
  "Generate PDF",
  "Exit",
];
const data = [];
(async () => {
  // try {
  //   candidateData = await getCache();
  // } catch (e) {
  //   if (e.code !== "ENOENT") console.log(e);
  // }
  // if (candidateData.basicDetails) {
  //   mainOptions.splice(0, 1);
  //   mainOptions.splice(0, 0, "Update Basic Details");
  // }
  // if (candidateData.resumeSpecificDetails) {
  //   mainOptions.splice(1, 1);
  //   mainOptions.splice(1, 0, "Update Resume Specific Details");
  // }
  // while (!exitMainMenu) {
  //   let { answer } = await inquirer.prompt({
  //     type: "list",
  //     name: "answer",
  //     message: "Resume Generator",
  //     choices: mainOptions,
  //   });
  //   switch (answer) {
  //     case "Add Basic Details":
  //       candidateData.basicDetails = await updateBasicDetails();
  //     case "Update Basic Details":
  //       const { basicUserDetailsUpdatedValues } = await inquirer.prompt({
  //         type: "list",
  //         name: "basicUserDetailsUpdatedValues",
  //         message: "What value would you like to update",
  //         choices: Object.values(
  //           basicDetailsPrompt.map(({ message }) => message)
  //         ),
  //       });
  //       const updatedCandidateBasicDetails = await updateBasicDetails(
  //         candidateData.basicDetails,
  //         basicDetailsPrompt.reduce((str, curr) => {
  //           if (curr.message === basicUserDetailsUpdatedValues) str = curr.name;
  //           return str;
  //         }, "")
  //       );
  //       candidateData.basicDetails = updatedCandidateBasicDetails;
  //       break;
  //     case "Add or Remove Academic Details":
  //       await getAcademicDetails(candidateData.academicQualifications);
  //       break;
  //     case "Add or Remove Career Details":
  await getCareerDetails(candidateData.experiences);
  //       break;
  //     case "Add Resume Specific Details":
  //       candidateData.resumeSpecificDetails = await getResumeSpecificDetails();
  //       break;
  //     case "Update Resume Specific Details":
  //       const { specificDetailMessage } = await inquirer.prompt({
  //         type: "list",
  //         name: "specificDetailMessage",
  //         message: "What value would you like to update",
  //         choices: Object.values(
  //           resumeSpecificPrompts.map(({ message }) => message)
  //         ),
  //       });
  //       let selectedOptionName = resumeSpecificPrompts.reduce((str, curr) => {
  //         if (curr.message === specificDetailMessage) str = curr.name;
  //         return str;
  //       }, "");
  //       let updatedResumeSpecificDetails = await getResumeSpecificDetails(
  //         candidateData.resumeSpecificDetails,
  //         selectedOptionName
  //       );
  //       candidateData.resumeSpecificDetails = updatedResumeSpecificDetails;
  //       break;
  //     case "Cache Data":
  //       saveCache(candidateData);
  //       break;
  //     case "Generate PDF":
  //       try {
  //         let pdf = await getPdfBuffer(candidateData);
  //         await fs.promises.writeFile(outPath, pdf);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //       break;
  //     case "Exit":
  //       exitMainMenu = true;
  //   }
  // }
})();
