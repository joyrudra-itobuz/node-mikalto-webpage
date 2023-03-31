import fs from "fs/promises";
import path from "path";
import { cardData } from "./experience-card-data.mjs";

const dataPath = path.join("card-data.txt");

const data = cardData;

const writeData = async (dataPath) => {
  await fs.writeFile(dataPath, JSON.stringify(data));
  return data;
};

writeData(dataPath);
