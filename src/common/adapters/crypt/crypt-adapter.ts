export interface ICryptAdapter {
    generateSalt(): Promise<string>
    hash(password: string): Promise<string>
    compare(password: string, passwordEncrypted: string): Promise<boolean>
    encrypt(text: string): string
    decrypt(text: string): string
}