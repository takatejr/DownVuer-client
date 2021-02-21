import path from "path";
import { codeService } from "../services/code.service.js";

const sendFile = async (req, res) => {
  const access = codeService()
    .getStorage()
    .filter(x => x.code === req.params.code);

  if (access) {
    const title = access.title;
    const filePath = path.join(`/DownVuer/Vue/src/Node/${title}`);

    res.download(filePath, err => {
      console.error(err + filePath);
    });
  } else {
    res.status(401).send("Unauthorize connection");
  }
};

export { sendFile };
