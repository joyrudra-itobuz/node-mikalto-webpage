import * as fs from "fs/promises";
import * as path from "path";
import * as http from "http";
import * as getPath from "./module/getPath.mjs";

const server = http.createServer(async (req, res) => {
  if (req.url.length !== 0 && req.url.charAt(0) === "/") {
    console.log("called!");
    const imagePath = getPath.findImage(req.url);
    console.log(imagePath);
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
