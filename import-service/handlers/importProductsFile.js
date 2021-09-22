import { S3 } from 'aws-sdk';
import { BUCKET } from '../constants';
import { handleErrorResponse } from '../utils/handleErrorResponse';

export const importProductsFile = async (event) => {
  const { queryStringParameters} = event;
  if (!queryStringParameters) return handleErrorResponse(400);

  const { name } = queryStringParameters;
  if (!name) return handleErrorResponse(400);

  console.log(name);

  const catalogPath = `uploaded/${name}`;

  const params = {
    Bucket: BUCKET,
    Key: catalogPath,
    ContentType: 'text/csv'
  }

  let url;

  const s3 = new S3({region: 'eu-west-1'});

  try {
    url = await s3.getSignedUrlPromise('putObject', params);
    console.log(url);
  } catch (e) {
    console.log(e);
    return handleErrorResponse(500);
  }

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: url
  }
}