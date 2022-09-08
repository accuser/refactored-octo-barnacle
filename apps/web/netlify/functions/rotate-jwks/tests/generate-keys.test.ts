import { importJWK, jwtVerify, SignJWT } from 'jose';
import { describe, it, expect } from 'vitest';
import { generateKeys } from '$lib/services';

describe('generateKeys', () => {
	it('generates a new key pair and kid', async () => {
		const { kid, privateJwk, publicJwk } = await generateKeys();

		expect(kid).toBeDefined();
		expect(privateJwk).toBeDefined();
		expect(publicJwk).toBeDefined();
	});

	describe('kid', () => {
		it('is a valid ulid', async () => {
			const { kid } = await generateKeys();

			expect(kid).toMatch(/^[0-7][0-9A-HJKMNP-TV-Z]{25}$/);
		});

		it('is unique', async () => {
			const { kid } = await generateKeys();
			const { kid: kid2 } = await generateKeys();

			expect(kid).not.toBe(kid2);
		});

		it('is lexographically ordered', async () => {
			const { kid } = await generateKeys();
			const { kid: kid2 } = await generateKeys();

			expect(kid < kid2).toBe(true);
		});
	});

	describe('privateJwk', () => {
		it('is a JWK', async () => {
			const { privateJwk } = await generateKeys();

			expect(privateJwk).toBeDefined();
			expect(privateJwk.kty).toBe('RSA');
			expect(privateJwk.d).toBeDefined();
			expect(privateJwk.e).toBeDefined();
			expect(privateJwk.n).toBeDefined();
			expect(privateJwk.p).toBeDefined();
			expect(privateJwk.q).toBeDefined();
			expect(privateJwk.dp).toBeDefined();
			expect(privateJwk.dq).toBeDefined();
			expect(privateJwk.qi).toBeDefined();
		});

		it('can be imported', async () => {
			const { privateJwk } = await generateKeys();

			const privateKey = await importJWK(privateJwk);

			expect(privateKey).toBeDefined();
		});

		it('can be used to sign a JWT', async () => {
			const { privateJwk } = await generateKeys();

			const privateKey = await importJWK(privateJwk);

			const jwt = await new SignJWT({ some: 'payload' })
				.setProtectedHeader({ alg: privateJwk.alg as string })
				.sign(privateKey);

			expect(jwt).toBeDefined();
		});
	});

	describe('publicJwk', () => {
		it('is a JWK', async () => {
			const { publicJwk } = await generateKeys();

			expect(publicJwk).toBeDefined();
			expect(publicJwk.kty).toBe('RSA');
			expect(publicJwk.e).toBeDefined();
			expect(publicJwk.n).toBeDefined();
			expect(publicJwk.kid).toBeDefined();
			expect(publicJwk.x5t).toBeDefined();
		});

		it('can be imported', async () => {
			const { publicJwk } = await generateKeys();

			const publicKey = await importJWK(publicJwk);

			expect(publicKey).toBeDefined();
		});

		it('can be used to verify a JWT', async () => {
			const { privateJwk, publicJwk } = await generateKeys();

			const privateKey = await importJWK(privateJwk);
			const publicKey = await importJWK(publicJwk);

			const jwt = await new SignJWT({ claim: 'valid' })
				.setProtectedHeader({ alg: privateJwk.alg as string })
				.sign(privateKey);

			const { payload } = await jwtVerify(jwt, publicKey);

			expect(payload.claim).toBe('valid');
		});
	});
});
