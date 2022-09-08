import type { Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';

type LogInterceptor = { (handle: Handle): Handle };

const log: LogInterceptor = (handle) =>
	dev
		? async ({ event, resolve }) => {
				const {
					request: { method },
					url: { pathname, search }
				} = event;

				const markName = Math.random().toString(36).slice(2);

				performance.mark(markName);

				const response = await handle({ event, resolve });

				performance.measure(markName, {
					start: markName,
					detail: { method, pathname, search, status: response.status }
				});

				performance
					.getEntriesByName(markName)
					.filter(({ entryType }) => entryType === 'measure')
					.forEach((entry) => {
						const {
							duration,
							detail: { method, pathname, search, status }
						} = entry.toJSON() as {
							duration: number;
							detail: { method: string; pathname: string; search: string; status: number };
						};

						const href = [pathname, search].filter(Boolean).join('');

						console.log(`${status} ${method} ${href} (${duration.toFixed(2)}ms)`);
					});

				performance.clearMarks(markName);
				performance.clearMeasures(markName);

				return response;
		  }
		: handle;

const logRequest: Handle = log(async ({ event, resolve }) => resolve(event));

export default logRequest;
