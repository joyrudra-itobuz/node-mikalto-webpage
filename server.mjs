import * as fs from "fs/promises";
import * as path from "path";
import * as http from "http";
import * as getPath from "./module/getPath.mjs";
import { parse } from "querystring";
let chunks = "";

const server = http.createServer(async (req, res) => {
  if (req.url === "/submit-date") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.writeHead(200, { "Content-Type": "application/json" });
    req.on("data", (chunk) => {
      chunks = chunk.toString();
    });
    req.on("end", async () => {
      let parsedData = parse(chunks);
      const filePath = path.join(
        "database",
        "booking-dates",
        "booking-dates.txt"
      );
      await fs.appendFile(filePath, JSON.stringify(parsedData), {
        encoding: "utf8",
      });
    });
    res.write(chunks);
    res.end();
    chunks = "";
    console.log("Submitting Now");
  } else if (req.url === "/subcribe-data") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.writeHead(200, { "Content-Type": "application/json" });
    req.on("data", (chunk) => {
      chunks = chunk.toString();
    });
    req.on("end", async () => {
      let parsedData = parse(chunks);
      const filePath = path.join(
        "database",
        "subscriber-data",
        "subcriber-emails.txt"
      );
      await fs.appendFile(filePath, JSON.stringify(parsedData), {
        encoding: "utf8",
      });
    });
    res.write(chunks);
    res.end();
    chunks = "";
    console.log("Getting Email Now");
  } else if (req.url.length !== 0 && req.url.charAt(0) === "/") {
    const imagePath = getPath.findImage(req.url);
    const imageBuffer = await fs.readFile(imagePath);
    res.setHeader("Content-Type", "image/jpeg");
    res.end(imageBuffer);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Not Found");
    res.end();
  }
});

const port = "5050";
const host = "127.0.0.1";

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
