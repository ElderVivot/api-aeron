import { IGeneratePasswordAdapter } from './generate-hash-adapter';
export declare class GeneratePasswordImplementation implements IGeneratePasswordAdapter {
    generatePassword(symbols?: boolean): string;
}
