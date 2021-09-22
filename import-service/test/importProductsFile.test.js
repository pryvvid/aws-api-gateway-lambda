import AWSMock from 'aws-sdk-mock';
import { importProductsFile } from '../handlers/importProductsFile';

test("importProductsFile should response with 200 code", async () => {
  const eventParams = {
    "queryStringParameters": {
      "name": "gamedata"
    }
  }

  const mockUrl = 'http://example.com/mocked-url';

  // AWSMock.mock('S3', 'getSignedUrl', (_action, _params, callback) => {
  //   console.log('S3', 'getSignedUrl', 'mock called')
  //   callback(null, mockUrl);
  // });

  AWSMock.mock('S3', 'getSignedUrl', mockUrl);

  const expectedStatusCode = 200;

  const { body, statusCode } = await importProductsFile(eventParams);

  expect(body).toEqual(mockUrl);
  expect(statusCode).toEqual(expectedStatusCode);
});

test("importProductsFile responds with 400 code", async () => {
  const eventParams = {
    "queryStringParameters": {
      "notName": "gamedata"
    }
  }

  const expectedBody = JSON.stringify({message: "Bad request"});
  const expectedStatusCode = 400;

  const { body, statusCode } = await importProductsFile(eventParams);

  expect(body).toEqual(expectedBody);
  expect(statusCode).toEqual(expectedStatusCode);
});
