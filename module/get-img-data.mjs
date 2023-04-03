import fs from "fs/promises";

export const getImages = async (imgPath) => {
  const imgData = await fs.readdir(imgPath);
  return imgData;
};

export const normalizeImageName = (img) => {
  let data = "";
  for (let i = 0 - 1; i < img.length; i++) {
    if (img.charAt(i) !== ".") data += img.charAt(i);
    else if (img.charAt(i) === ".") break;
  }
  console.log(data);
  return data;
};
