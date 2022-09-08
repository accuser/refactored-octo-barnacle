import SanityClientConstructor from '@sanity/client';
import { dev } from '$app/environment';
import { SANITY_DATASET, SANITY_PROJECT_ID, SANITY_TOKEN } from '$env/static/private';

const sanity = SanityClientConstructor({
	dataset: SANITY_DATASET,
	projectId: SANITY_PROJECT_ID,
	apiVersion: 'v2021-10-21',
	token: SANITY_TOKEN,
	useCdn: !dev
});

export default sanity;
