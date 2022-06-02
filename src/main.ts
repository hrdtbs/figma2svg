import { getFigmaComponents, getFigmaImages, getImageData } from "./api";
import fs from "fs-extra";
import path from "path";
import * as core from "@actions/core";

const main = async () => {
  const token = core.getInput("token");
  const id = core.getInput("id");
  const output = core.getInput("output");
  const components = await getFigmaComponents(token, id);
  const images = await getFigmaImages(token, id, components);

  const queues = images.map(async (image) => {
    const data = await getImageData(image.link);
    const filepath = path.join(output, `${image.name}.svg`);
    await fs.ensureFile(filepath);
    await fs.writeFile(filepath, data);
  });

  await Promise.all(queues);
};

main();
