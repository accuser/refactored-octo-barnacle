import type { Handler } from '@netlify/functions';
import { getJwks } from '$lib/services';

const msUntilNextHour = () => 3600000 - (new Date().getTime() % 3600000);

const ttl = () => Math.round(msUntilNextHour() / 1000);

/**
 * Reponds with the current JSON Web Key set.
 *
 * @see {@link https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/}
 */
export const handler: Handler = async () => {
	try {
		const jwks = await getJwks();

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jwks),
			ttl: ttl()
		};
	} catch (e) {
		console.error(e);

		return {
			statusCode: 500,
			body: JSON.stringify(e)
		};
	}
};
