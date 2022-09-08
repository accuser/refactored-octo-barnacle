import { FAUNA_DOMAIN, FAUNA_SECRET } from '$env/static/private';
import FaunaDB from 'faunadb';

const fauna = new FaunaDB.Client({
	domain: FAUNA_DOMAIN,
	secret: FAUNA_SECRET
});

export default fauna;
