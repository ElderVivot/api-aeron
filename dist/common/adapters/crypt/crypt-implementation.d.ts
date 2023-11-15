import { ICryptAdapter } from './crypt-adapter';
export declare class CryptImplementation implements ICryptAdapter {
    generateSalt(): Promise<string>;
    hash(password: string): Promise<string>;
    compare(password: string, passwordEncrypted: string): Promise<boolean>;
    encrypt(text: any): string;
    decrypt(text: any): string;
}
