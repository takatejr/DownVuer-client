import path from "path";

import { accessToStorage } from "../services/code.service.js";

const sendFile = async (req, res) => {
  if (accessToStorage.filter(x => x.code === req.params.code)) {
    const filePath = path.join(`/DownVuer/Vue/src/Node/${code.title}`);

    res.download(filePath, err => {
      console.error(err + filePath);
    });
  } else {
    res.status(401).send("Unauthorize connection");
  }
};

export { sendFile };
