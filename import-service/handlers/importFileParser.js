import { S3 } from 'aws-sdk';
import csv from 'csv-parser';
import { BUCKET } from '../constants';
import { handleErrorResponse } from '../utils/handleErrorResponse';

export const importFileParser = async (event) => {
  const s3 = new S3({region: 'eu-west-1'});
  const results = [];
  
  try {
    for (const record of event.Records) {
      const s3ReadStream = s3.getObject({
        Bucket: BUCKET,
        Key: record.s3.object.key
      }).createReadStream();

      s3ReadStream
        .pipe(csv())
        .on('data', (chunk) => {
          console.log(chunk);
          results.push(chunk);
        })
        .on('error', (error) => {
          console.error(error);
          return handleErrorResponse(500);
        })
        .on('end', () => {
          console.log('End of readstream');
          console.log(results);
        })

        // Move csv file from 'uploaded' to 'parsed folder
        await s3.copyObject({
          Bucket: BUCKET,
          CopySource: `${BUCKET}/${record.s3.object.key}`,
          Key: record.s3.object.key.replace('uploaded', 'parsed')
        }).promise();
    
        await s3.deleteObject({
          Bucket: BUCKET,
          Key: record.s3.object.key
        }).promise();
    }
  } catch (e) {
    console.log(e);
    return handleErrorResponse(500);
  }
  
  return {
    statusCode: 202
  }
}