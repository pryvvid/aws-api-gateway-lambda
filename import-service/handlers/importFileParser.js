import { S3 } from "aws-sdk";
import csv from "csv-parser";
import stream from "stream";
import util from "util";
import { BUCKET } from "../constants";
import { handleErrorResponse } from "../utils/handleErrorResponse";

const finished = util.promisify(stream.finished);

export const importFileParser = async (event) => {
  const s3 = new S3({ region: "eu-west-1" });
  const sqs = new AWS.SQS();
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
            results.forEach((chunk) => {
              sqs.sendMessage(
                {
                  QueueUrl: process.env.SQS_URL,
                  MessageBody: chunk,
                },
                () => {
                  console.log("Added to queue", chunk);
                }
              );
            });
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
    } catch (error) {
      console.error(error);
      return handleErrorResponse(500);
    }
  }

  return {
    statusCode: 202,
  };
};
