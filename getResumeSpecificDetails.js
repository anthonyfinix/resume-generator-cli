const Prompt = require("./Prompt");
const getResumeSpecificDetails = async () => {
  return await Prompt([
    {
      type: "input",
      name: "caption",
      message: "Write a one liner caption for yourself",
    },
    {
      type: "arrayPrompt",
      name: "companyExpectations",
      data: [],
      choice: [
        {
          label: "Add Expectation Point",
          cb: async () => {
            const { expectation } = await Prompt([
              {
                type: "input",
                name: "expectation",
                message: "Enter your expectation",
              },
            ]);
            return expectation;
          },
        },
        { label: "Remove Expecation" },
      ],
      choicePromptName: "expectation",
    },
  ]);
};
exports.getResumeSpecificDetails = getResumeSpecificDetails;
