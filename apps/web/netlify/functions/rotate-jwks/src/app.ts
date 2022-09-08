import type { Handler } from '@netlify/functions';
import { generateKeys, persistKeys } from '$lib/services';

export const handler: Handler = async () => {
	try {
		const keys = await generateKeys();

		await persistKeys(keys);

		return { statusCode: 200 };
	} catch (e) {
		console.error(e);
	}

	return { statusCode: 500 };
};
