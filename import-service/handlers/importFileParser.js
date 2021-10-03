import AWS from "aws-sdk";
import csv from "csv-parser";
import stream from "stream";
import util from "util";
import { BUCKET } from "../constants";
import { handleErrorResponse } from "../utils/handleErrorResponse";

const finished = util.promisify(stream.finished);

export const importFileParser = async (event) => {
  const s3 = new AWS.S3({ region: "eu-west-1" });
  const sqs = new AWS.SQS({region: "eu-west-1"});
  const { SQS_URL } = process.env; 
  const results = [];

  for (const record of event.Records) {
    const s3ReadStream = s3
      .getObject({
        Bucket: BUCKET,
        Key: record.s3.object.key,
      })
      .createReadStream();

    try {
      await finished(
        s3ReadStream
          .pipe(csv())
          .on("data", (chunk) => {
            console.log(chunk);
            results.push(chunk);
          })
          .on("end", () => {
            console.log("End of readstream");
            console.log(results);
          })
          .on("error", (error) => {
            console.error(error);
            return handleErrorResponse(500);
          })
      );

      await s3
        .copyObject({
          Bucket: BUCKET,
          CopySource: `${BUCKET}/${record.s3.object.key}`,
          Key: record.s3.object.key.replace("uploaded", "parsed"),
        })
        .promise();

      console.log(
        `Copied into ${BUCKET}/${record.s3.object.key.replace(
          "uploaded",
          "parsed"
        )}`
      );

      await s3
        .deleteObject({
          Bucket: BUCKET,
          Key: record.s3.object.key,
        })
        .promise();

      console.log(`Deleted from ${BUCKET}/${record.s3.object.key}`);

      // results.forEach((item) => {
      //   const message = JSON.stringify(item);
      //   // console.log(typeof message);
      //   sqs.sendMessage(
      //     {
      //       QueueUrl: SQS_URL,
      //       MessageBody: message,
      //     },
      //     (error, data) => {
      //       if (error) {
      //         console.log(`Error for send to SQS: ${error}`);
      //       } else {
      //         console.log(`Message was sent to SQS: ${data}`);
      //       }
      //     }
      //   );
      // });
    } catch (error) {
      console.error(error);
      return handleErrorResponse(500);
    }
  }

  for (const result of results) {
    const message = JSON.stringify(result);
    try {
      await sqs.sendMessage(
        {
          QueueUrl: SQS_URL,
          MessageBody: message,
        },
      ).promise();
    } catch (error) {
      console.log(error);
    }
  }  

  return {
    statusCode: 202,
  };
};
