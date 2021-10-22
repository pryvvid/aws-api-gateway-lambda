export const handleErrorResponse = (code = 500) => {
  let message = "Internal server error";
  switch (code) {
    case 400:
      message = "Bad request";
      break;
    case 401:
      message = "Unauthorized";
      break;
    case 403:
      message = "Forbidden";
      break;
    case 404:
      message = "Not found";
      break;
    case 500:
      break;
    default:
      break;
  }

  return {
    statusCode: code,
    body: JSON.stringify({ message }),
  };
};
