import * as bcrypt from 'bcrypt'
import cryptojs from 'crypto-js'

import { ICryptAdapter } from './crypt-adapter'

export class CryptImplementation implements ICryptAdapter {
    async generateSalt (): Promise<string> {
        return await bcrypt.genSalt()
    }

    async hash (password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    async compare (password: string, passwordEncrypted: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordEncrypted)
    }

    encrypt (text: any): string {
        return cryptojs.AES.encrypt(text, process.env.HASH_SECRET).toString()
    }

    decrypt (text: any): string {
        const bytes = cryptojs.AES.decrypt(text, process.env.HASH_SECRET)
        return bytes.toString(cryptojs.enc.Utf8)
    }
}