// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}

	interface PrivateEnv {
		FAUNA_DOMAIN: string;
		FAUNA_SECRET: string;
		PLANETSCALE_DATABASE_URL: string;
		SANITY_DATASET: string;
		SANITY_PROJECT_ID: string;
		SANITY_TOKEN: string;
	}

	// interface PublicEnv {}
}
