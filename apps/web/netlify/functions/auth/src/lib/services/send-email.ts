import type { TemplatedMessage } from 'postmark';
import postmark from '$lib/config/postmark';
import type { MessageSendingResponse } from 'postmark/dist/client/models';

interface SendEmail {
	(message: TemplatedMessage): Promise<MessageSendingResponse>;
}

/**
 * Request sending of an email based on the template provided.
 *
 * @param template - the email template
 * @returns promise that resolves to a {@link MessageSendingResponse}.
 */
const sendEmail: SendEmail = async (template) =>
	postmark.sendEmailWithTemplate(template);

export default sendEmail;
