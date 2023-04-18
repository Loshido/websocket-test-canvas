import express from "express";
import http from "http";

const app = express();
app.use(express.static("app"))

const server = http.createServer(app);

export default server