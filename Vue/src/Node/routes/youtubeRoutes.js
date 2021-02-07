import { Router } from "express";
import { playlistDownload } from "../controllers/playlistDownload.js";
import { singleDownload } from "../controllers/singleDownload.js";
import { partialDownload } from "../controllers/partialDownload.js";
import { getInfo } from "../controllers/getInfo.js";

export const youtubeRoute = Router();

youtubeRoute.post("/playlist", playlistDownload);
youtubeRoute.post("/partial", partialDownload);
youtubeRoute.post("/single", singleDownload);
youtubeRoute.post("/info", getInfo);
