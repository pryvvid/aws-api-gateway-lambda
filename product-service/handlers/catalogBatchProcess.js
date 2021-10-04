import AWS from "aws-sdk";
import { addProductToDb } from "../utils/addProductToDb";

export const catalogBatchProcess = async (event) => {
  const data = event.Records.map(({ body }) => body);
  const { SNS_TOPIC_ARN } = process.env;
  const sns = new AWS.SNS({ region: "eu-west-1" });

  for (const product of data) {
    try {
      const addedProduct = await addProductToDb(product);

      await sns
        .publish({
          Subject: "New product was added to catalog",
          Message: JSON.stringify(addedProduct),
          TopicArn: SNS_TOPIC_ARN,
          MessageAttributes: {
            price: {
              DataType: "Number",
              StringValue: `${addedProduct.price}`,
            },
          },
        })
        .promise();

      console.log(addedProduct);
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal server error" }),
      };
    }
  }

  return {
    statusCode: 202,
    body: JSON.stringify({ message: "Accepted" }),
  };
};
