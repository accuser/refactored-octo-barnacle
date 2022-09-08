import { type JWK, base64url } from 'jose';
import planetscale from '$lib/config/planetscale';

const decode = <T>(value: string): T =>
	JSON.parse(base64url.decode(value).toString());

interface GetPrivateJwk {
	(): Promise<Required<JWK>>;
}

/**
 * Get the private JSON Web Key for signing tokens.
 *
 * @returns promise that resolves to the private JSON Web Key.
 */
const getPrivateJwk: GetPrivateJwk = async () =>
	planetscale
		.execute(
			'SELECT kid, private_key FROM keys WHERE private_key IS NOT NULL ORDER BY kid DESC LIMIT 1;'
		)
		.then(({ rows }) => rows[0] as { kid: string; private_key: string })
		.then(({ kid, private_key }) => ({ ...decode(private_key), kid }));

export default getPrivateJwk;
