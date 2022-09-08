import { ServerClient } from 'postmark';
import { POSTMARK_SERVER_TOKEN } from '$lib/config/env';

const postmark = new ServerClient(POSTMARK_SERVER_TOKEN);

export default postmark;
