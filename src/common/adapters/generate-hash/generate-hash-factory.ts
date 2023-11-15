import { IGeneratePasswordAdapter } from './generate-hash-adapter'
import { GeneratePasswordImplementation } from './generate-hash-implementation'

export function makeGeneratePasswordImplementation (): IGeneratePasswordAdapter {
    return new GeneratePasswordImplementation()
}