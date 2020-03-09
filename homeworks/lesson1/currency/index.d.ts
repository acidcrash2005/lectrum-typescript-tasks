interface Settings {
    symbol: string;
    separator: string;
    decimal: string;
    formatWithSymbol: boolean;
    errorOnInvalid: boolean;
    precision: number;
    pattern: '!#';
    negativePattern: '-!#';
}

interface AdditionalSettings {
    groups: RegExp;
    increment: number;
    useVedic: boolean;
}

interface ExtendProps {
    _settings: Settings & AdditionalSettings;
    _precision: number;
}

export interface CurrencyPrototype extends ExtendProps {
    intValue: number;
    value: number;

    add(number: number): void;
    subtract(number: number): void;
    multiply(number: number): void;
    divide(number: number): void;
    distribute(count: number): void;
    dollars(): number;
    cents(): number;
    format(useSymbol: boolean): string;
    toString(): string;
    toJSON(): number;
}

export type CurrencyValue = number | string | Currency;

export interface Currency extends ExtendProps {
    new (value: CurrencyValue, opts: Settings): CurrencyPrototype;
    (value: CurrencyValue, opts: Settings): void;

    prototype: CurrencyPrototype;
}
