const express = require("express");
const axios = require("axios").default;
const handleResposeBff = require("./utils/handleResposeBff");

const app = express();

app.use(express.json());

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.all("/*", async (req, res) => {
  console.log("originalUrl", req.originalUrl);
  console.log("method", req.method);
  console.log("body", req.body);

  const [_, recipient] = req.originalUrl.split("/");
  console.log("recipient", recipient);

  const recipientUrl = process.env[recipient];
  console.log("recipientUrl", recipientUrl);

  if (recipientUrl) {
    return handleResposeBff(req, res, recipientUrl);
  }

  return res.status(502).json({ error: "Cannot process request" });
});

module.exports = app;
