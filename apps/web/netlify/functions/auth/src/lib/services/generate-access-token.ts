import { importJWK, SignJWT } from 'jose';
import { JWT_ACCESS_AUDIENCE, JWT_ISSUER } from '$lib/config/env';
import getPrivateJwk from '$lib/services/get-private-jwk';

type GenerateAccessToken = {
	(id: string): Promise<string>;
};

/**
 * Generate access token for the authenticated user.
 *
 * @param id - authenticated user's id
 * @returns promise that resolves to an authentication token.
 */
const generateAccessToken: GenerateAccessToken = async (id) => {
	const { alg, kid, ...private_jwk } = await getPrivateJwk();

	const key = await importJWK(private_jwk, alg);
	const aud = JWT_ACCESS_AUDIENCE.toString();
	const exp = '1h';
	const iss = JWT_ISSUER.toString();
	const typ = 'JWT';

	return new SignJWT({})
		.setAudience(aud)
		.setExpirationTime(exp)
		.setIssuer(iss)
		.setProtectedHeader({ alg, kid, typ })
		.setSubject(id)
		.sign(key);
};

export default generateAccessToken;
