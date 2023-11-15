import { generate } from 'generate-password'

import { IGeneratePasswordAdapter } from './generate-hash-adapter'

export class GeneratePasswordImplementation implements IGeneratePasswordAdapter {
    generatePassword (symbols: boolean = true): string {
        return generate({
            length: 15,
            symbols
        })
    }
}