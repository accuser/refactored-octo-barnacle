import type { JWK } from 'jose';
import { afterEach, describe, it, vi, beforeEach } from 'vitest';
import generateKeys from '$lib/services/generate-keys';
import persistKeys from '$lib/services/persist-keys';

declare module 'vitest' {
	export interface TestContext {
		kid: string;
		privateJwk: JWK;
		publicJwk: JWK;
	}
}

vi.mock('@planetscale/database', async () => {
	const Client = vi.fn();

	Client.prototype.execute = vi.fn();

	return { Client };
});

describe('persistKey', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	beforeEach(async (context) => {
		const { kid, privateJwk, publicJwk } = await generateKeys();

		context.kid = kid;
		context.privateJwk = privateJwk;
		context.publicJwk = publicJwk;
	});

	it('persists a key pair', async ({ kid, privateJwk, publicJwk }) => {
		persistKeys({ kid, privateJwk, publicJwk });
	});
});
