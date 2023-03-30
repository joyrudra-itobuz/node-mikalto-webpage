import fs from "fs/promises";

export const getCardData = async (dataPath) => {
  let data = await fs.readFile(dataPath, { encoding: "utf8" });
  data = JSON.parse(data);
  return data;
};

const writeData = async (dataPath) => {
  let data = await getData();
  await fs.writeFile(dataPath, JSON.stringify(data));
  return data;
};
