import awsLambdaFastify from '@fastify/aws-lambda';
import app from './src/app';

const proxy = awsLambdaFastify(app());

export { proxy as handler };
