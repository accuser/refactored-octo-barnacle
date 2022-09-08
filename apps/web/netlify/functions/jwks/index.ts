import { builder } from '@netlify/functions';
import { handler as app } from './src/app';

export const handler = builder(app);
