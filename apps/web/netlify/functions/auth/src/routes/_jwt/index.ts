import cookie from 'cookie';
import type { FastifyInstance } from 'fastify';
import { DEV, JWT_DOMAIN, JWT_RETURN } from '$lib/config/env';
import {
	generateAccessToken,
	generateIdToken,
	getAccountWithEmail,
	verifyAuthToken
} from '$lib/services';

export default async (fastify: FastifyInstance, opts) => {
	fastify.get<{ Params: { jwt: string } }>('/:jwt', async (request, reply) => {
		const {
			params: { jwt }
		} = request;

		const { email } = await verifyAuthToken(jwt);

		if (!email) {
			return { statusCode: 404 };
		}

		const { id, displayName } = await getAccountWithEmail(email);

		if (!id) {
			return { statusCode: 404 };
		}

		const [accessToken, idToken] = await Promise.all([
			generateAccessToken(id),
			generateIdToken(id, {
				displayName,
				email
			})
		]);

		const html = `
      <html lang="en">
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <noscript>
            <meta http-equiv="refresh" content="0; url=${JWT_RETURN}" />
          </noscript>
        </body>
        <script>
          setTimeout(function() {
            window.location.href = "${JWT_RETURN}";
          }, 0);
        </script>
      </html>
    `;

		reply
			.code(200)
			.headers({
				'Cache-Control': 'no-cache',
				'Content-Type': 'text/html',
				'Set-Cookie': [
					cookie.serialize('access_token', accessToken, {
						domain: JWT_DOMAIN,
						expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 day
						httpOnly: !DEV,
						path: '/',
						secure: !DEV
					}),
					cookie.serialize('id_token', idToken, {
						domain: JWT_DOMAIN,
						expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 2 weeks
						httpOnly: !DEV,
						path: '/',
						secure: !DEV
					})
				]
			})
			.send(html);
	});
};
