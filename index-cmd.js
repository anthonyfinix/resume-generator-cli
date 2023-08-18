// const MenuManager = require("./menuManage");
// // const menu = new MenuManager();
// // menu.addItem()
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const getBirthYearFromAge = require("./getBirthYearFromAge");
const outPath = path.join(__dirname, "dist", "output.pdf");
// const getBasicDetails = require("./getBasicDetails");
const { updateBasicDetails } = require("./updateBasicDetails");
const getAcademicDetails = require("./getAcademicDetails");
const getCareerDetails = require("./getCareerDetails");
const getResumeSpecificData = require("./getResumeSpecificData");
const getPdfBuffer = require("./getPdfBuffer");
const { getCache, saveCache } = require("./cacheCandidateData");
const CallbackManager = require("./handlers");

let cache;
let exitMainMenu = false;
let basicDetails = {};
let resumeSpecificData;
let experiences = [];
let academicQualifications = [];

(async () => {
  const hasData =
    basicDetails &&
    experiences.length &&
    academicQualifications.length &&
    resumeSpecificData;
  const mainMenuHandlers = CallbackManager();
  mainMenuHandlers.setHandler(
    "Basic Details",
    // async () => await getBasicDetails(basicDetails)
    async () => await updateBasicDetails(basicDetails)
  );
  mainMenuHandlers.setHandler(
    "Academic Details",
    async () => await getAcademicDetails(academicQualifications)
  );
  mainMenuHandlers.setHandler(
    "Career Details",
    async () => await getCareerDetails(experiences)
  );
  mainMenuHandlers.setHandler(
    "Resume Specific Changes",
    async () => (resumeSpecificData = await getResumeSpecificData())
  );
  mainMenuHandlers.setHandler("Exit", async () => (exitMainMenu = true));
  if (hasData) {
    mainMenuHandlers.setHandler("Cache Data", async () => {
      saveCache({
        basicDetails,
        resumeSpecificData,
        experiences,
        academicQualifications,
      });
    });
    mainMenuHandlers.setHandler("Generate PDF", async () => {
      try {
        let pdf = await getPdfBuffer({
          basicDetails,
          resumeSpecificData,
          experiences,
          academicQualifications,
        });
        await fs.promises.writeFile(outPath, pdf);
      } catch (e) {
        console.log(e);
      }
    });
  }
  while (!exitMainMenu) {
    let mainMenuAns = await inquirer.prompt({
      type: "list",
      name: "answer",
      message: "Resume Generator",
      choices: Object.keys(mainMenuHandlers.handlers),
    });
    await mainMenuHandlers.handlers[mainMenuAns.answer].cb();
  }
})();
