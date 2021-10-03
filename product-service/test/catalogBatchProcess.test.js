import AWSMock from 'aws-sdk-mock';
import { catalogBatchProcess } from '../handlers/catalogBatchProcess';
import * as addProductToDbFn  from '../utils/addProductToDb'

afterEach(() => {
  AWSMock.restore('SNS');
});

test("catalogBatchProcess should send message", async () => {

  const eventData = {
    Records: [
      {
        title: 'new game',
        description: 'new game description',
        price: 5,
        count: 10,
        img: 'http://example.com/'
      }
    ]
  }

  const spy = jest.spyOn(addProductToDbFn, 'addProductToDb');
  spy.mockReturnValue(eventData.Records[0]);

  // AWSMock.mock('S3', 'getSignedUrl', (_action, _params, callback) => {
  //   console.log('S3', 'getSignedUrl', 'mock called')
  //   callback(null, mockUrl);
  // });

  AWSMock.mock('SNS', 'publish', 'test-message');

  const expectedStatusCode = 202;

  const { statusCode } = await catalogBatchProcess(eventData);

  expect(statusCode).toEqual(expectedStatusCode);
});

