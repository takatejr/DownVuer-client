import fs from "fs";
import youtubedl from "youtube-dl";
import path from "path";

const partialDownload = async (req, res) => {
  const url = req.body.url;
  const format = req.body.format;

  youtubedl.getInfo(url, function(err, info) {
    let downloaded = 0;
    const outputTitle = `${info.title}` + ".mp3";
    const filePath = path.join(outputTitle);
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
        res.send(outputTitle);
        console.log("finished downloading, streaming now!");
        console.log("");
      } catch (error) {
        res.send({ message: error });
      }
    });

    video.on("end", () => {
      fs.unlink(filePath, (err) => {
        console.log("usuwam");
        if (err) {
          console.error(err);
        }
      });
    });
  });
};

export { partialDownload };
