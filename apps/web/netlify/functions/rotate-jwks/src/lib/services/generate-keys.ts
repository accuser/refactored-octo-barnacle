import { calculateJwkThumbprint, exportJWK, generateKeyPair, type JWK } from 'jose';
import { ulid } from 'ulid';

const generateKeys = async (alg = 'RS512', use = 'sig') =>
	generateKeyPair(alg).then(({ privateKey, publicKey }) =>
		Promise.all([ulid(), exportJWK(privateKey), exportJWK(publicKey)])
			.then(([kid, privateJwk, publicJwk]) => ({
				kid,
				privateJwk: { ...privateJwk, alg, use } as JWK,
				publicJwk: { ...publicJwk, alg, kid, use } as JWK
			}))
			.then(async ({ publicJwk, ...rest }) => ({
				...rest,
				publicJwk: { ...publicJwk, x5t: await calculateJwkThumbprint(publicJwk) } as JWK
			}))
	);

export default generateKeys;
