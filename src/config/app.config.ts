import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  apiVersion: process.env.API_VERSION,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsAccessSecretKey: process.env.AWS_ACCESS_SECRET_KEY,
  awsBucketName: process.env.AWS_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  //   awsCloudFrontURL: process.env.AWS_CLOUDFRONT_URL,
}));
