import type { FastifyInstance } from 'fastify';
import FastifyApiKey from 'fastify-api-key';
import { AUTH_KEY } from '$lib/config/env';
import {
	generateAuthEmail,
	generateAuthToken,
	getAccountWithEmail,
	sendEmail
} from '$lib/services';

export default async (fastify: FastifyInstance, _opts) => {
	fastify.register(FastifyApiKey, {
		getSecret: async () => AUTH_KEY
	});

	fastify.addHook('onRequest', async (request, reply) => {
		try {
			await request.apiKeyVerify();
		} catch (err) {
			reply.send(err);
		}
	});

	fastify.post<{ Body: { email: string } }>('/', async (request, reply) => {
		const { email } = request.body;

		if (!email) {
			return { statusCode: 400 };
		}

		const account = await getAccountWithEmail(email);

		if (account) {
			const auth_token = await generateAuthToken(email);
			const auth_email = generateAuthEmail(email, auth_token);

			await sendEmail(auth_email);
		}

		reply.status(200);
	});
};
