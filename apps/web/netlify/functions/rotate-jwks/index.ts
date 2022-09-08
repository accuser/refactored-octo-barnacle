import { schedule } from '@netlify/functions';
import { handler as app } from './src/app';

export const handler = schedule('@daily', app);
