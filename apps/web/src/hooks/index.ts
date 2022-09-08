import { sequence } from '@sveltejs/kit/hooks';
import logRequest from './log-request';

export const handle = sequence(logRequest);
