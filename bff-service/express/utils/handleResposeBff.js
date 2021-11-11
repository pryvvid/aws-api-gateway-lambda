const axios = require("axios").default;
const shouldReturnCachedData = require("./shouldReturnCachedData");

let cachedProducts = null;
let cachedStatus = null;

const handleResposeBff = async (req, res, recipientUrl) => {
  // check if products list should be returned from cache
  if (req.originalUrl.substring(1) === "products" && req.method === "GET") {
    if (shouldReturnCachedData())
      return res.status(cachedStatus).json(cachedProducts);
  }

  const axiosConfig = {
    method: req.method,
    url: `${recipientUrl}${req.originalUrl}`,
    ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
  };

  console.log("axiosConfig:", axiosConfig);

  try {
    const response = await axios(axiosConfig);

    // make cache for products list
    if (req.originalUrl.substring(1) === "products" && req.method === "GET") {
      cachedProducts = response.data;
      cachedStatus = response.status;
    }
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log(JSON.stringify(error));

    if (error.response) {
      const { status, statusText } = error.response;
      console.log("Status:", status);
      console.log("Message:", statusText);
      return res.status(status).json({ message: statusText });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = handleResposeBff;
