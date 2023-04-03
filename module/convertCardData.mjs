import fs from "fs/promises";
import path from "path";
import { data } from "./dataset.mjs";

const dataPath = path.join("other-activites-data.txt");

const writeData = async (dataPath) => {
  await fs.writeFile(dataPath, JSON.stringify(data));
  return data;
};

writeData(dataPath);
