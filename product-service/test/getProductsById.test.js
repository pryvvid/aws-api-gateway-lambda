import { getProductsById } from '../handlers/getProductsById';
import { gameDB } from '../db/gameDB';

test("getProductsById to equal game id", async () => {
  const eventParams = {
    "pathParameters": {
      "id": "1"
    }
  }

  const expectedBody = JSON.stringify(gameDB[0]);
  const expectedStatusCode = 200;

  const {body, statusCode} = await getProductsById(eventParams);

  expect(body).toEqual(expectedBody);
  expect(statusCode).toEqual(expectedStatusCode);
});

test("getProductsList responds with 404 code", async () => {
  const eventParams = {
    "pathParameters": {
      "id": "0"
    }
  }

  const expectedBody = JSON.stringify({message: "Game not found"});
  const expectedStatusCode = 404;

  const {body, statusCode} = await getProductsById(eventParams);

  expect(body).toEqual(expectedBody);
  expect(statusCode).toEqual(expectedStatusCode);
});

test("getProductsList responds with 400 code", async () => {
  const eventParams = {
    "pathParameters": {}
  }

  const expectedBody = JSON.stringify({message: "Bad request"});
  const expectedStatusCode = 400;

  const {body, statusCode} = await getProductsById(eventParams);

  expect(body).toEqual(expectedBody);
  expect(statusCode).toEqual(expectedStatusCode);
});