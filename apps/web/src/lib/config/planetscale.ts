import { Client } from '@planetscale/database';
import { PLANETSCALE_DATABASE_URL } from '$env/static/private';

const planetscale = new Client({
	url: PLANETSCALE_DATABASE_URL
});

export default planetscale;
