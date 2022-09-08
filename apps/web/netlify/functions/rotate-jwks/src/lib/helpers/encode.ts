import { base64url } from 'jose';

const encode = <T>(value: T): string => base64url.encode(JSON.stringify(value));

export default encode;
