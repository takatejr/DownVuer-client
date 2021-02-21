import fs from "fs";
import youtubedl from "youtube-dl";

const partialDownload = async (req, res) => {
  const url = req.body.url;
  const format = req.body.format.format;
  const ext = req.body.format.text;
  
  youtubedl.getInfo(url, function(err, info) {
    let downloaded = 0;
    const outputTitle = `${info.title}.${ext}`
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
        res.setHeader("Content-Type", "text/plain");
        res.status(200).send(outputTitle);
        console.log("finished downloading, streaming now!");
        console.log("");

      } catch (error) {
        res.send({ message: error });
      }
    });
  });
};

export { partialDownload };
