import { DEV } from '$lib/config/env';
import Fastify from 'fastify';

const app = () => {
	const fastify = Fastify({ maxParamLength: 2048 });

	fastify.register(import('./routes'), {
		prefix: DEV ? '/.netlify/functions/auth' : '/auth'
	});

	fastify.register(import('./routes/_jwt'), {
		prefix: DEV ? '/.netlify/functions/auth' : '/auth'
	});

	return fastify;
};

export default app;
