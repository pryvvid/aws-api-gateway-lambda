import { S3 } from 'aws-sdk';
import csv from 'csv-parser';
import stream from 'stream';
import util from 'util';
import { BUCKET } from '../constants';
import { handleErrorResponse } from '../utils/handleErrorResponse';

const finished = util.promisify(stream.finished);

export const importFileParser = async (event) => {
  const s3 = new S3({region: 'eu-west-1'});
  const results = [];
  
  for (const record of event.Records) {
    const s3ReadStream = s3.getObject({
      Bucket: BUCKET,
      Key: record.s3.object.key
    }).createReadStream();

    await finished(
      s3ReadStream
        .pipe(csv())
        .on('data', (chunk) => {
          console.log(chunk);
          results.push(chunk);
        })
        .on('end', async () => {
          console.log('End of readstream');
          console.log(results);

          console.log('s3', s3);
          console.log('bucket', BUCKET);
          console.log('record', record);

          try {
            await s3.copyObject({
              Bucket: BUCKET,
              CopySource: `${BUCKET}/${record.s3.object.key}`,
              Key: record.s3.object.key.replace('uploaded', 'parsed')
            }).promise();
        
            await s3.deleteObject({
              Bucket: BUCKET,
              Key: record.s3.object.key
            }).promise();
          } catch (error) {
            console.error(error);
            return handleErrorResponse(500);
          }
        })
        .on('error', (error) => {
          console.error(error);
          return handleErrorResponse(500);
        })
    );
  }

  return {
    statusCode: 202
  }
}