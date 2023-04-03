import * as fs from "fs/promises";
import * as path from "path";
import * as http from "http";
import * as getPath from "./module/get-path.mjs";
import { parse } from "querystring";
import { getCardData } from "./module/get-card-data.mjs";
import { getImages, normalizeImageName } from "./module/get-img-data.mjs";

const port = "5050";
const host = "127.0.0.1";

const sendCardData = async (folderName) => {
  let dataPath = path.resolve();
  dataPath = path.join(dataPath, "database", folderName, "card-data.txt");
  const data = await getCardData(dataPath);
  return data;
};

const getFormData = async (folderName, fileName, req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.writeHead(200, { "Content-Type": "application/json" });

  let chunks = "";

  req.on("data", (chunk) => {
    chunks = chunk.toString();
  });

  req.on("end", async () => {
    let parsedData = parse(chunks);
    const filePath = path.join("database", folderName, fileName);
    if (Object.keys(parsedData).length !== 0) {
      await fs.appendFile(filePath, JSON.stringify(parsedData), {
        encoding: "utf8",
      });
    }
  });

  res.write(chunks);
  res.end();
  chunks = "";
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/" || req.url === "") {
    res.write("No routes Defined!");
    res.end();
  } else if (req.url === "/get_experience-card_data") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const data = await sendCardData("experience-matters-cards-data");
    res.write(JSON.stringify(data));
    res.end();
  } else if (req.url === "/get_room_data") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const data = await sendCardData("room-category");
    res.write(JSON.stringify(data));
    res.end();
  } else if (req.url === "/submit-date") {
    getFormData("booking-dates", "booking-dates.csv", req, res);
    res.end();
  } else if (req.url === "/subcribe-data") {
    getFormData("subscriber-data", "subcriber-emails.csv", req, res);
    res.end();
  } else if (req.url.substring(0, 7) === "/images") {
    const imagePath = getPath.findImage(req.url);
    const imageBuffer = await fs.readFile(imagePath);
    res.setHeader("Content-Type", "image/jpeg");
    res.end(imageBuffer);
  } else if (req.url === "/img_room_category") {
    const imgData = await getImages(
      path.join(path.resolve(), "database", "images", "room-category")
    );
    console.log(imgData);
    const sendData = [];

    for (let i = 0; i < imgData.length; i++) {
      let getImgName = normalizeImageName(imgData[i]);
      sendData[i] = {
        indexNo: `${i + 1}`,
        imgSrc: `http://${host}:${port}/images_room-category_${getImgName}`,
      };
    }
    console.log(sendData);
    res.write(JSON.stringify(sendData));
    res.end();
  } else if (req.url === "/get_bg_images") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const dataPath = path.join("database", "bg-image-data", "bg-img-data.txt");
    const data = await fs.readFile(dataPath, { encoding: "utf8" });
    res.write(data);
    res.end();
  } else if (req.url === "/get_welcome_data") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const dataPath = path.join(
      "database",
      "welcome-data",
      "welcome-data copy.txt"
    );
    const data = await fs.readFile(dataPath, { encoding: "utf8" });
    res.write(data);
    res.end();
  } else if (req.url === "/get_other_activities_data") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const dataPath = path.join(
      "database",
      "other-activities",
      "other-activites-data.txt"
    );
    const data = await fs.readFile(dataPath, { encoding: "utf8" });
    res.write(data);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Not Found");
    res.end();
  }
});

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
