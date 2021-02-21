import fs from "fs";
import youtubedl from "youtube-dl";

const generateCode = length => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

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
        const code = generateCode(32)
        const aa = [{code: code, path: outputTitle}]
        res.setHeader("Content-Type", "application/json");
        res.status(200).send({filesize: fs.stat(outputTitle).size, link: `${code}`, ext: ext});
        console.log("finished downloading, streaming now!");
        console.log("");

      } catch (error) {
        res.send({ message: error });
      }
    });
  });
};

export { partialDownload };
