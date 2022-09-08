import { Client } from '@planetscale/database';
import { fetch } from 'undici';
import { PLANETSCALE_WO_URL } from '$lib/config/env';

const planetscale = new Client({
	fetch,
	url: PLANETSCALE_WO_URL
});

export default planetscale;
