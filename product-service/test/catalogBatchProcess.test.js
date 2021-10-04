import AWSMock from "aws-sdk-mock";
import { catalogBatchProcess } from "../handlers/catalogBatchProcess";
import * as addProductToDbFn from "../utils/addProductToDb";
import { addProductToDb } from "../utils/addProductToDb";

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

afterEach(() => {
  AWSMock.restore("SNS");
});

test('addProductToDb should have been called', async () => {
  const spyAddProduct = jest.spyOn(addProductToDbFn, "addProductToDb");
  spyAddProduct.mockReturnValue(eventData.Records[0]);

  AWSMock.mock("SNS", "publish", "test-message");

  await catalogBatchProcess(eventData);

  expect(addProductToDb).toHaveBeenCalled()
})

test("catalogBatchProcess should respond with 202 code", async () => {
  const spyAddProduct = jest.spyOn(addProductToDbFn, "addProductToDb");
  spyAddProduct.mockReturnValue(eventData.Records[0]);

  AWSMock.mock("SNS", "publish", "test-message");

  const expectedStatusCode = 202;

  const { statusCode } = await catalogBatchProcess(eventData);

  expect(statusCode).toEqual(expectedStatusCode);
});

test("catalogBatchProcess should respond with 500 code", async () => {
  const spyAddProduct = jest.spyOn(addProductToDbFn, "addProductToDb");
  spyAddProduct.mockReturnValue(eventData.Records[0]);

  AWSMock.mock("SNS", "publish", () => {
    throw new Error("Oops");
  });

  const expectedStatusCode = 500;

  const { statusCode } = await catalogBatchProcess(eventData);

  expect(statusCode).toEqual(expectedStatusCode);
});
