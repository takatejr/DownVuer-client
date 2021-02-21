import { Router } from "express";
import { playlistDownload } from "../controllers/playlistDownload.js";
import { singleDownload } from "../controllers/singleDownload.js";
import { partialDownload } from "../controllers/partialDownload.js";
import { getInfo } from "../controllers/getInfo.js";
import path from "path";


export const youtubeRoute = Router();

youtubeRoute.post("/playlist", playlistDownload);
youtubeRoute.post("/partial", partialDownload);
youtubeRoute.post("/single", singleDownload);
youtubeRoute.post("/info", getInfo);

youtubeRoute.get("/iddd", (req, res, err) => {
  const filePath = path.join(
    `/DownVuer/Vue/src/Node/White House Records x 71 - Posse Cut (wrocławska kolaboracja).mp3`
  );
  console.log(filePath)

  res.download(filePath)
});
