import { base64url } from 'jose';

const decode = <T>(value: string): T => JSON.parse(base64url.decode(value).toString());

export default decode;
