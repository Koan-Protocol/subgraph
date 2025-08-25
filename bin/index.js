const { Command } = require("commander");
const { exec } = require("child_process");
const path = require("path");

const program = new Command();

program
  .command("prepare")
  .arguments("<network>")
  .action((network) => {
    const projectRoot = path.dirname(__dirname);
    const configPath = path.join(projectRoot, "config", `${network}.js`);

    console.log({ configPath });
    // const command = `npx mustache "${configPath}" subgraph.template.yaml > subgraph.yaml`;

    const subgraphYamlCommand = `npx mustache "${configPath}" subgraph.template.yaml > subgraph.yaml`;
    const subgraphConstantCommand = `npx mustache "${configPath}" src/utils/constants.template.ts > src/utils/constants.ts`;

    exec(subgraphYamlCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log("Template processing completed successfully!");
      if (stdout) console.log(`Stdout: ${stdout}`);
    });
    exec(subgraphConstantCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log("Constants processing completed successfully!");
    });
  });

program.parse(process.argv);
