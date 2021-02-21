import fs from "fs";
import path from "path";
import youtubedl from "youtube-dl";
import { addToCodeStorage } from "../services/code.service.js";

const partialDownload = async (req, res) => {
  const url = req.body.url;
  const format = req.body.format.format;
  const ext = req.body.format.text;

  youtubedl.getInfo(url, function(err, info) {
    let downloaded = 0;
    const outputTitle = `${info.title}.${ext}`;
    const video = youtubedl(url, [`--format=${format}`], { start: downloaded });

    video.on("info", function(info) {
      console.log("Download started");
      console.log("filename: " + info.fulltitle);
    });

    if (fs.existsSync(outputTitle)) {
      downloaded = fs.statSync(outputTitle).size;
    }

    video.pipe(fs.createWriteStream(outputTitle));

    video.on("end", () => {
      try {
        const filePath = path.join(`/DownVuer/Vue/src/Node/${outputTitle}`);
        const code = addToCodeStorage(outputTitle, filePath);

        res.setHeader("Content-Type", "application/json");
        res.status(200).send({
          filesize: fs.stat(outputTitle).size,
          link: `${code}`,
          ext: ext,
        });

        console.log("");
        console.log("");
      } catch (error) {
        res.send({ message: error });
      }
    });
  });
};

export { partialDownload };
