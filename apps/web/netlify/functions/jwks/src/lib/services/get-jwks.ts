import type { JSONWebKeySet } from 'jose';
import { planetscale } from '$lib/config';
import { decode } from '$lib/helpers';

/**
 * Get the current JSON Web Key set.
 *
 * @returns a promise that resolves to JSON Web Key set.
 */
const getJwks = async (): Promise<JSONWebKeySet> =>
	planetscale
		.execute(`SELECT publicKey FROM keys;`)
		.then(({ rows }) => rows.map((row) => row as { publicKey: string }))
		.then(
			(rows) =>
				({
					keys: rows.map(({ publicKey }) => ({ ...decode(publicKey) }))
				} as JSONWebKeySet)
		);

export default getJwks;
