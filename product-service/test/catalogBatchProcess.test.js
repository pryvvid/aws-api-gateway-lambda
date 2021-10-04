import AWSMock from "aws-sdk-mock";
import { catalogBatchProcess } from "../handlers/catalogBatchProcess";
import * as addProductToDbFn from "../utils/addProductToDb";

afterEach(() => {
  AWSMock.restore("SNS");
});

test("catalogBatchProcess should respond with 202 code", async () => {
  const eventData = {
    Records: [
      {
        title: "new game",
        description: "new game description",
        price: 5,
        count: 10,
        img: "http://example.com/",
      },
    ],
  };

  const spy = jest.spyOn(addProductToDbFn, "addProductToDb");
  spy.mockReturnValue(eventData.Records[0]);

  AWSMock.mock("SNS", "publish", "test-message");

  const expectedStatusCode = 202;

  const { statusCode } = await catalogBatchProcess(eventData);

  expect(statusCode).toEqual(expectedStatusCode);
});

test("catalogBatchProcess should respond with 500 code", async () => {
  const eventData = {
    Records: [
      {
        title: "new game",
        description: "new game description",
        price: 5,
        count: 10,
        img: "http://example.com/",
      },
    ],
  };

  const spy = jest.spyOn(addProductToDbFn, "addProductToDb");
  spy.mockReturnValue(eventData.Records[0]);

  AWSMock.mock("SNS", "publish", () => {
    throw new Error("Oops");
  });

  const expectedStatusCode = 500;

  const { statusCode } = await catalogBatchProcess(eventData);

  expect(statusCode).toEqual(expectedStatusCode);
});
