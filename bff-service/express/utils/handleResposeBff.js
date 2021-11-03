const axios = require("axios").default;
const getCached = require("./getCached");

let cachedProducts = null;

const handleResposeBff = async (req, res, recipientUrl) => {
  if (req.originalUrl.substring(1) === "products" && req.method === "GET") {
    if (getCached()) return res.status(200).json(cachedProducts);
  }

  const axiosConfig = {
    method: req.method,
    url: `${recipientUrl}${req.originalUrl}`,
    ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
  };

  console.log("axiosConfig:", axiosConfig);

  try {
    const response = await axios(axiosConfig);
    // console.log("Response", response);
    if (req.originalUrl.substring(1) === "products" && req.method === "GET") {
      cachedProducts = response.data;
    }
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
};

module.exports = handleResposeBff;
