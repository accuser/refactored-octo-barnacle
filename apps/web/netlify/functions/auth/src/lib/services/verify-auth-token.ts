import { createLocalJWKSet, jwtVerify, type JWTVerifyResult } from 'jose';
import getPublicJwks from '$lib/services/get-public-jwks';
import { JWT_ISSUER } from '$lib/config/env';

interface AuthTokenClaims {
	email: string;
}

type AuthTokenClaimsExtractor = { (result: JWTVerifyResult): AuthTokenClaims };

/**
 * Extract only known claims from the payload of a JSON Web Token.
 *
 * @param result - the claims from a verified auth token
 * @returns the extracted claims.
 */
const extractAuthTokenClaims: AuthTokenClaimsExtractor = ({
	payload: { sub: email }
}) => ({ email } as AuthTokenClaims);

type VerifyAuthToken = {
	(token: string): Promise<AuthTokenClaims>;
};

/**
 * Verify a JWT auth token.
 *
 * @param token - JWT auth token
 * @returns verified claims
 */
const verifyAuthToken: VerifyAuthToken = async (token) => {
	const jwks = createLocalJWKSet(await getPublicJwks());

	return await jwtVerify(token, jwks, {
		audience: JWT_ISSUER.toString(),
		issuer: JWT_ISSUER.toString()
	}).then(extractAuthTokenClaims);
};

export default verifyAuthToken;
