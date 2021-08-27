import { getProductsList } from '../handlers/getProductsList';
import { gameDB } from '../db/gameDB'

test("getProductsList to equal gameDB", async () => {

  const expectedBody = JSON.stringify(gameDB);
  const expectedStatusCode = 200;

  const {body, statusCode} = await getProductsList();

  expect(body).toEqual(expectedBody);
  expect(statusCode).toEqual(expectedStatusCode);
});
