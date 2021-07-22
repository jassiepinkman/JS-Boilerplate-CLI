const fs = require("fs");
const inquirer = require("inquirer");

async function jsBoilerplate() {
  console.log(`Welcome to JS Boilerplate!`);
  const { isNewFolder } = await inquirer.prompt([
    {
      type: "confirm",
      name: "isNewFolder",
      message: "Would you like to create a new folder for your files?",
    },
  ]);

  let folderName = "";
  if (isNewFolder) {
    await inquirer
      .prompt([
        {
          type: "input",
          name: "folder",
          message: "Please enter a Folder Name:",
        },
      ])
      .then(({ folder }) => {
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder);
          folderName = folder;
        }
      });
  }

  let chooseBoilerplate = [
    {
      type: "list",
      name: "BoilerplateType",
      message: "Please Choose your Boilerplate Type:",
      choices: ["JS with HTML & CSS", "JS with HTML", "JS Only"],
    },
  ];

  let jsFile = fs.readFileSync(`${__dirname}/app.js`);
  let htmlFile = fs.readFileSync(`${__dirname}/index.html`);
  let cssFile = fs.readFileSync(`${__dirname}/styles.css`);

  await inquirer
    .prompt(chooseBoilerplate)
    .then(({ BoilerplateType }) => {
      if (BoilerplateType === "JS with HTML & CSS") {
        fs.writeFileSync(`${process.cwd()}/${folderName}/app.js`, jsFile);
        fs.writeFileSync(`${process.cwd()}/${folderName}/index.html`, htmlFile);
        fs.writeFileSync(`${process.cwd()}/${folderName}/styles.css`, cssFile);
      }
      if (BoilerplateType === "JS with HTML") {
        fs.writeFileSync(`${process.cwd()}/${folderName}/app.js`, jsFile);
        fs.writeFileSync(`${process.cwd()}/${folderName}/index.html`, htmlFile);
      }
      if (BoilerplateType === "JS Only") {
        fs.writeFileSync(`${process.cwd()}/${folderName}/app.js`, jsFile);
      }
    })
    .catch((err) => console.log(err));
  console.log("Generated Successfully!");
}
jsBoilerplate();

module.exports = jsBoilerplate;
