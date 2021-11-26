import * as core from "@actions/core";
import { readFileSync } from "fs";
import { load } from "js-yaml";

const run = async (): Promise<void> => {
  const user = core.getInput("commandUser", { required: true });
  const file = core.getInput("fileURI", { required: true });

  const doc = load(readFileSync(file, "utf8"), {
    json: true,
  }) as file;

  const approved = doc.find((region) => region.approvers.includes(`@${user}`));

  if (approved) {
    core.setOutput("approved", "true");
  } else {
    core.setOutput("approved", "false");
  }
};

run();
