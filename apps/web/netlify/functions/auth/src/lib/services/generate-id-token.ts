import { importJWK, SignJWT } from 'jose';
import getPrivateJwk from '$lib/services/get-private-jwk';
import { JWT_ID_AUDIENCE, JWT_ISSUER } from '$lib/config/env';

type GenerateIdToken = {
	(
		id: string,
		claims: { displayName?: string; email: string }
	): Promise<string>;
};

/**
 * Generate id token for the authenticated user.
 *
 * @param id - authenticating user's id
 * @returns promise that resolves to an id token.
 */
const generateIdToken: GenerateIdToken = async (id, { displayName, email }) => {
	const { alg, kid, ...private_jwk } = await getPrivateJwk();

	const key = await importJWK(private_jwk, alg);
	const aud = JWT_ID_AUDIENCE.toString();
	const exp = '30d';
	const iss = JWT_ISSUER.toString();
	const sub = id;
	const typ = 'JWT';

	return new SignJWT({ displayName, email })
		.setAudience(aud)
		.setExpirationTime(exp)
		.setIssuer(iss)
		.setProtectedHeader({ alg, kid, typ })
		.setSubject(sub)
		.sign(key);
};

export default generateIdToken;
