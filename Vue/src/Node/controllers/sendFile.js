import path from "path";
import fs from "fs";

const sendFile = async (req, res) => {
  if (req.params.code === code) {
    const filePath = path.join(`/DownVuer/Vue/src/Node/${code.title}`);

    fs.download(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(400);
      }
    });
  } else {
    res.status(401).send('Unauthorize connection')
  }
};

export { sendFile };
