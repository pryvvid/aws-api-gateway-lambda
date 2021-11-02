const express = require("express");
const axios = require("axios").default;

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
    const axiosConfig = {
      method: req.method,
      url: `${recipientUrl}${req.originalUrl}`,
      ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
    };

    console.log("axiosConfig:", axiosConfig);

    try {
      const response = await axios(axiosConfig);
      // console.log("Response", response);
      return res.status(response.status).json(response.data);
    } catch (error) {
      // console.log("Error:", error);
      console.log(JSON.stringify(error));

      if (error.response) {
        const { message } = error;
        const { status, statusText } = error.response;
        console.log("Status:", status);
        console.log("Message:", message);
        return res
          .status(status)
          .json({ message: statusText, errorMessage: message });
      } else {
        return res.status(500).json({ error: error.message });
      }
    }

    // console.log("Error response", error.response);
  }

  return res.status(502).json({ error: "Cannot process request" });
});

// app.use("/", (req, res) => {
//   return res.status(200).json({ message: "App is runnning" });
// });

module.exports = app;
