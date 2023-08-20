const puppeteer = require("puppeteer");
const path = require("path");

async function getPdfBuffer(candidateDetails) {
  const localFilePath = path.join(__dirname, "template", "template.html");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`file://${localFilePath}`);
  await page.evaluate((candidateDetails) => {
    const {
      basicDetails,
      resumeSpecificDetails,
      experiences,
      academicQualifications,
    } = candidateDetails;
    if (resumeSpecificDetails.caption) {
      const caption = document.querySelector("#caption");
      caption.innerHTML = resumeSpecificDetails.caption;
    }
    if (resumeSpecificDetails.expectation) {
      const expectation = document.querySelector("#expectation");
      expectation.innerHTML = resumeSpecificDetails.expectation;
    }
    if (basicDetails.candidateName) {
      const name = document.querySelector("#name");
      name.innerHTML = basicDetails.candidateName;
    }
    if (basicDetails.candidateContactNumber) {
      const mobileNumber = document.querySelector("#mobile-number");
      mobileNumber.innerHTML = basicDetails.candidateContactNumber;
    }
    if (basicDetails.candidateEmailAddress) {
      const email = document.querySelector("#email");
      email.innerHTML = basicDetails.candidateEmailAddress;
    }
    if (
      basicDetails.candidateBirthYear &&
      basicDetails.candidateBirthMonth &&
      basicDetails.candidateBirtDay
    ) {
      const dob = document.querySelector("#date-of-birth");
      dob.innerHTML = `${basicDetails.candidateBirtDay} ${basicDetails.candidateBirthMonth} ${basicDetails.candidateBirthYear}`;
    }
    if (basicDetails.candidatePresentAddress) {
      const address = document.querySelector("#current-address");
      address.innerHTML = basicDetails.candidatePresentAddress;
    }
    if (basicDetails.candidatePermanentAddress) {
      const address = document.querySelector("#permanent-address");
      address.innerHTML = basicDetails.candidatePermanentAddress;
    }
    if (basicDetails.candidateLanguage) {
      const address = document.querySelector("#language");
      address.innerHTML = basicDetails.candidateLanguage;
    }
    if (experiences) {
      let experienceWrapper = document.querySelector("#experience-wrapper");
      experiences.forEach(
        ({
          establishmentName,
          point1,
          point2,
          point3,
          tenureStartingYear,
          tenureEndingYear,
        }) => {
          experienceWrapper.appendChild(
            new DOMParser().parseFromString(
              ` <div class="experience">
                <div>
                  <h2 class="establishment-name">${establishmentName}</h2>
                  <p class="designation">Senior Software Engineer</p>
                  <div>
                    <small>${tenureStartingYear}</small>
                    <small>-</small>
                    <small>${tenureEndingYear}</small>
                  </div>
                </div>
                <ul>
                  <li>${point1}</li>
                  <li>${point2}</li>
                  <li>${point3}</li>
                </ul>
              </div>`,
              "text/html"
            ).body.firstChild
          );
        }
      );
    }
    if (academicQualifications) {
      let academicWrapper = document.querySelector("#academic-wrapper");
      academicQualifications.forEach(
        ({
          educationLevel,
          academyName,
          academyAddress,
          academyStartingYear,
          academyEndingYear,
        }) => {
          academicWrapper.appendChild(
            new DOMParser().parseFromString(
              `<div class="academy">
              <div>
                <h2 class="academy-name">${academyName}</h2>
                <div>
                  <small>${academyStartingYear}</small>
                  <small>-</small>
                  <small>${academyEndingYear}</small>
                </div>
              </div>
              <h4 class="education-level">${educationLevel}</h4>
            </div>`,
              "text/html"
            ).body.firstChild
          );
        }
      );
    }
    return true;
  }, candidateDetails);
  const pdf = await page.pdf({ format: "A4" });
  await browser.close();
  return pdf;
}
module.exports = getPdfBuffer;
