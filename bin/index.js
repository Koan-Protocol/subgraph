const { Command } = require("commander");
const { exec } = require("child_process");

const program = new Command();

program
  .command("prepare")
  .arguments("<subgraph> <network>")
  .action((subgraph, network) => {
    console.log("fffffffffffff");
    console.log("prepare command called", { subgraph, network });
    exec(
      `node_modules/.bin/mustache config/${network}.js subgraphs/${subgraph}/subgraph.template.yaml > subgraphs/${subgraph}/subgraph.yaml`
    );
    // exec(
    //   `node_modules/.bin/mustache config/${network}.js subgraphs/${subgraph}/src/constants/addresses.template.ts > subgraphs/${subgraph}/src/constants/addresses.ts`
    // );
  });

program.parse(process.argv);
