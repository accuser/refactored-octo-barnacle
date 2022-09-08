import { base64url, type JSONWebKeySet } from 'jose';
import planetscale from '$lib/config/planetscale';

const decode = <T>(value: string): T =>
	JSON.parse(base64url.decode(value).toString());

interface GetPublicJwks {
	(): Promise<Required<JSONWebKeySet>>;
}

/**
 * Get an array of public JSON Web Keys.
 *
 * @returns promise that resolves to the public JSON Web Keys.
 */
const getPublicJwks: GetPublicJwks = async () =>
	planetscale
		.execute('SELECT kid, public_key FROM keys;')
		.then(({ rows }) =>
			rows.map((row) => row as { kid: string; public_key: string })
		)
		.then(
			(rows) =>
				({
					keys: rows.map(({ kid, public_key }) => ({
						...decode(public_key),
						kid
					}))
				} as JSONWebKeySet)
		);

export default getPublicJwks;
