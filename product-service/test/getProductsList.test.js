import { getProductsList } from '../handlers/getProductsList';
import { gameDB } from '../db/gameDB'

test("getProductsList body is not undefined", async () => {

  const {body} = await getProductsList();

  expect(body).not.toBeUndefined();
});

test("getProductsList to equal gameDB and respons with 200 status code", async () => {

  const expectedBody = JSON.stringify(gameDB);
  const expectedStatusCode = 200;

  const {body, statusCode} = await getProductsList();

  expect(body).toEqual(expectedBody);
  expect(statusCode).toEqual(expectedStatusCode);
});
