import { getFigmaComponents, getFigmaImages, getImageData } from "./api";
import fs from "fs";
import path from "path";
import * as core from "@actions/core";
import { sleep } from "./helper/sleep";

const main = async () => {
  const token = core.getInput("token");
  const id = core.getInput("id");
  const output = core.getInput("output");
  const components = await getFigmaComponents(token, id);
  const images = await getFigmaImages(token, id, components);

  for (const image of images) {
    const data = await getImageData(image.link);
    const filename = image.name.split("/").pop();
    const filepath = path.join(output, `${filename}.svg`);
    fs.writeFileSync(filepath, data);
    await sleep(5);
  }
};

main();
