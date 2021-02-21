import { Router } from "express";
import { playlistDownload } from "../controllers/playlistDownload.js";
import { singleDownload } from "../controllers/singleDownload.js";
import { partialDownload } from "../controllers/partialDownload.js";
import { getInfo } from "../controllers/getInfo.js";
import { sendFile } from "../controllers/sendFile.js";
import { deleteFile } from "../controllers/deleteFile.js";

export const youtubeRoute = Router();

/* download */

youtubeRoute.post("/playlist", playlistDownload);
youtubeRoute.post("/partial", partialDownload);
youtubeRoute.post("/single", singleDownload);

/* file */

youtubeRoute.post("/file/info", getInfo);
youtubeRoute.get("/file/:id", sendFile);
youtubeRoute.delete("/file/:id", deleteFile);
