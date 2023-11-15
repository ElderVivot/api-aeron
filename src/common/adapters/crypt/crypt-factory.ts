import { ICryptAdapter } from './crypt-adapter'
import { CryptImplementation } from './crypt-implementation'

export function makeCryptImplementation (): ICryptAdapter {
    return new CryptImplementation()
}