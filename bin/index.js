const { Command } = require("commander");
const { exec } = require("child_process");
const path = require("path");

const program = new Command();

program
  .command("prepare")
  .arguments("<subgraph> <network>")
  .action((subgraph, network) => {
    // console.log("prepare command called", { subgraph, network });

    // Get the project root (assuming bin/index.js is in the root/bin folder)
    const projectRoot = path.dirname(__dirname);
    const subgraphDir = path.join(projectRoot, "subgraphs", subgraph);
    const configPath = path.join(projectRoot, "config", `${network}.json`);
    const mustachePath = path.join(
      projectRoot,
      "node_modules",
      ".bin",
      "mustache"
    );

    // console.log("Project root:", projectRoot);
    // console.log("Subgraph directory:", subgraphDir);
    // console.log("Config path:", configPath);

    //  const command = `node_modules/.bin/mustache ../../config/${network}.json subgraph.template.yaml > subgraph.yaml`;

    // const command = `../../node_modules/.bin/mustache ../../config/${network}.json subgraph.template.yaml > subgraph.yaml`;

    // const command = `${mustachePath} ${configPath} subgraph.template.yaml > subgraph.yaml`;

    const command = `npx mustache "${configPath}" subgraph.template.yaml > subgraph.yaml`;
    
    console.log("Executing command:", command);
    console.log("Current working directory:", process.cwd());

    exec(command, (error, stdout, stderr) => {
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

    // exec(
    //   `node_modules/.bin/mustache ../../config/${network}.json subgraph.template.yaml > subgraph.yaml`
    // );
    // exec(
    //   `node_modules/.bin/mustache ../../config/goerli.json subgraph.template.yaml > subgraph.yaml`
    // );

    // exec(
    //   `node_modules/.bin/mustache config/${network}.js subgraphs/${subgraph}/src/constants/addresses.template.ts > subgraphs/${subgraph}/src/constants/addresses.ts`
    // );
  });

program.parse(process.argv);
