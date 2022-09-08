import { afterEach, describe, expect, it, vi } from 'vitest';
import { getJwks } from '../src/lib/services';

vi.mock('@planetscale/database', async () => {
	const kid = '01GAZKAFQQS575XNA0YHD0MMA1';
	const public_key =
		'eyJrdHkiOiJSU0EiLCJuIjoibkczb28waGpSRTRGaFlVSlhsQ3lTYkg0eWhwUFFScFU5eXVjS1dPNk1iYXlYRFo0cGExWTR1QW1CYTdZeDdfdHBjSUtDWV9wcFhKSjUwa3oyY2VlTktJd0tXSWswUGFfbTFITjZoa0VHZFlrTmZ3ZkhIQVBFbVRSVDZfdUFyVkt0cXhzSzhPQkswSTFzMkt3UnF3Tm9JMUZFSlpqVTh4VGZSZGwzb3o3NXh2cDQtbmMzYkFnMFR4cmRCMUZRbEtlZmkzNmkxZGZXcWd2b2xZcUF0QzJuenF2OGRKMUZ4YmJ6Y2RtRkhCTS1RVkdxQXJPaGV3UllpWTFZR3NCVnNZS1dyWWpYaTJzaEVQSGJnSXp6UEI4c0oyMkM2bC1EYkwzOGh4cl9Tc0RrWUlka2Y5TlNpMmN3OHg0ZXNBZmRlNjZKSXJPZ0FJZGlwTXZOOVpBSTIwWlZRIiwiZSI6IkFRQUIiLCJhbGciOiJSUzUxMiIsInVzZSI6InNpZyIsIng1dCI6IlFDanhndHo2VEJkb1kwc1dEMXl4SUxiY3I4WTlLRjA1djBFMVBUOVR5VTQifQ';

	const Client = vi.fn();

	Client.prototype.execute = vi.fn().mockResolvedValue({ rows: [{ kid, public_key }] });

	return { Client };
});

describe('getJwks', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it('gets a JSON Web Key set', async () => {
		const jwks = await getJwks();

		expect(jwks).toBeDefined();
		expect(jwks.keys).toBeDefined();
		expect(jwks.keys.length).toBe(1);

		expect(jwks.keys[0].kty).toBeDefined();
		expect(jwks.keys[0].e).toBeDefined();
		expect(jwks.keys[0].n).toBeDefined();
		expect(jwks.keys[0].kid).toBeDefined();
		expect(jwks.keys[0].x5t).toBeDefined();
	});
});
