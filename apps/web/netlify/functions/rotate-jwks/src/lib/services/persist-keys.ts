import type { JWK } from 'jose';
import { planetscale } from '$lib/config';
import { encode } from '$lib/helpers';

interface PersistKeys {
	({ kid, privateJwk, publicJwk }: { kid: string; privateJwk: JWK; publicJwk: JWK }): Promise<void>;
}

const persistKeys: PersistKeys = async ({ kid, privateJwk, publicJwk }) =>
	planetscale.transaction(async (tx) => {
		await tx.execute(
			'INSERT INTO keys (kid, privateKey, publicKey) VALUES (:kid, :privateKey, :publicKey);',
			{
				kid,
				privateKey: encode(privateJwk),
				publicKey: encode(publicJwk)
			}
		);
		await tx.execute('UPDATE keys SET privateKey = NULL WHERE kid != :kid;', {
			kid
		});
		// TODO expire keys
	});

export default persistKeys;
