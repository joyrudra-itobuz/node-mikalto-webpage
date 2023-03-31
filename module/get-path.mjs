import * as path from "path";
import * as fs from "fs/promises";

export const findImage = (reqUrl) => {
  reqUrl = reqUrl.substring(1, reqUrl.length);
  const pathArr = reqUrl.split("_");
  pathArr.unshift("database");
  pathArr[3] = pathArr[3] + ".jpg";
  const imagePath = path.join(pathArr[0], pathArr[1], pathArr[2], pathArr[3]);
  return imagePath;
};
