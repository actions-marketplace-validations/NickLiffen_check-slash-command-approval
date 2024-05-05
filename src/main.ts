// @ts-check

import * as core from "@actions/core";
import { readFileSync } from "fs";
import { load } from "js-yaml";

const run = async (): Promise<void> => {
  const user = core.getInput("commandUser", { required: true });
  const response = core.getBooleanInput("response", { required: true });
  const file = core.getInput("fileURI", { required: true });

  console.log(
    `This action received the following as the user who approved the slash command: ${user}`,
  );
  console.log(
    `This action received the following as the response (true/false) to the slash command: ${response}`,
  );
  console.log(
    `This action received the following as the path where the approved users can be found: ${file}`,
  );

  if (response === false) {
    console.log("Trial has been set to NOT APPROVED.");
    core.setOutput("approved", "false");
    return;
  }

  const doc = load(readFileSync(file, "utf8"), {
    json: true,
  }) as file;

  const approved = doc.find((region) => region.approvers.includes(`@${user}`));

  if (approved) {
    console.log("Trial has been set to APPROVED by an APPROVED user");
    core.setOutput("approved", "true");
  } else {
    console.log("Trial has been set to APPROVED by an NON APPROVED user");
    core.setOutput("approved", "false");
  }
};

run();
