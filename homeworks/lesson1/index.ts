interface Settings {
    symbol: string;
    separator: string;
    decimal: string;
    formatWithSymbol: boolean;
    errorOnInvalid: boolean;
    precision: number;
    pattern: '!#';
    negativePattern: '-!#';
    groups: RegExp;
    increment: number;
    useVedic: boolean;
}

interface CurrencyObject {
    intValue: number;
    value: number;
}

const round = (v: number) => Math.round(v);
const pow = (p: number) => Math.pow(10, p);
const rounding = (value: number, increment: number) =>
    round(value / increment) * increment;

const groupRegex = /(\d)(?=(\d{3})+\b)/g;
const vedicRegex = /(\d)(?=(\d\d)+\d\b)/g;

const defaults: Settings = {
    symbol: '$',
    separator: ',',
    decimal: '.',
    formatWithSymbol: false,
    errorOnInvalid: false,
    precision: 2,
    pattern: '!#',
    negativePattern: '-!#',
    groups: groupRegex,
    increment: 1,
    useVedic: false,
};

class Currency implements CurrencyObject {
    private _settings: Settings;
    private _precision: number;

    intValue: number;
    value: number;

    constructor(value: number, opts: Settings) {
        let settings: Settings = Object.assign({}, defaults, opts),
            precision = pow(settings.precision),
            v = this.parse(value, settings);

        this.intValue = v;
        this.value = v / precision;

        // Set default incremental value
        settings.increment = settings.increment || 1 / precision;

        // Support vedic numbering systems
        // see: https://en.wikipedia.org/wiki/Indian_numbering_system
        if (settings.useVedic) {
            settings.groups = vedicRegex;
        } else {
            settings.groups = groupRegex;
        }

        // Intended for internal usage only - subject to change
        this._settings = settings;
        this._precision = precision;
    }

    add(number: number) {
        let { intValue, _settings, _precision } = this;

        return new Currency(
            (intValue += this.parse(number, _settings)) / _precision,
            _settings
        );
    }

    subtract(number: number) {
        let { intValue, _settings, _precision } = this;
        return new Currency(
            (intValue -= this.parse(number, _settings)) / _precision,
            _settings
        );
    }

    multiply(number: number) {
        let { intValue, _settings } = this;
        return new Currency(
            (intValue *= number) / pow(_settings.precision),
            _settings
        );
    }

    divide(number: number) {
        let { intValue, _settings } = this;
        return new Currency(
            (intValue /= this.parse(number, _settings, false)),
            _settings
        );
    }

    distribute(count: number) {
        let { intValue, _precision, _settings } = this,
            distribution = [],
            split = Math[intValue >= 0 ? 'floor' : 'ceil'](intValue / count),
            pennies = Math.abs(intValue - split * count);

        for (; count !== 0; count--) {
            let item = new Currency(split / _precision, _settings);

            // Add any left over pennies
            pennies-- > 0 &&
                (item =
                    intValue >= 0
                        ? item.add(1 / _precision)
                        : item.subtract(1 / _precision));

            distribution.push(item);
        }

        return distribution;
    }

    dollars() {
        return ~~this.value;
    }

    cents() {
        let { intValue, _precision } = this;
        return ~~(intValue % _precision);
    }

    format(useSymbol: boolean) {
        let {
                pattern,
                negativePattern,
                formatWithSymbol,
                symbol,
                separator,
                decimal,
                groups,
            } = this._settings,
            values = (this + '').replace(/^-/, '').split('.'),
            dollars = values[0],
            cents = values[1];

        // set symbol formatting
        typeof useSymbol === 'undefined' && (useSymbol = formatWithSymbol);

        return (this.value >= 0 ? pattern : negativePattern)
            .replace('!', useSymbol ? symbol : '')
            .replace(
                '#',
                `${dollars.replace(groups, '$1' + separator)}${
                    cents ? decimal + cents : ''
                }`
            );
    }

    toString() {
        let { intValue, _precision, _settings } = this;
        return rounding(intValue / _precision, _settings.increment).toFixed(
            _settings.precision
        );
    }

    toJSON() {
        return this.value;
    }

    parse(
        value: number | string | CurrencyObject,
        opts: Settings,
        useRounding = true
    ) {
        let v = 0,
            { decimal, errorOnInvalid, precision: decimals } = opts,
            precision = pow(decimals);

        if (typeof value === 'number') {
            v = value * precision;
        } else if (typeof value === 'string') {
            let regex = new RegExp('[^-\\d' + decimal + ']', 'g'),
                decimalString = new RegExp('\\' + decimal, 'g');
            v =
                Number(
                    value
                        .replace(/\((.*)\)/, '-$1') // allow negative e.g. (1.99)
                        .replace(regex, '') // replace any non numeric values
                        .replace(decimalString, '.')
                ) * precision; // convert any decimal values // scale number to integer value
            v = v || 0;
        } else if (value instanceof Currency) {
            v = value.value;
        } else {
            if (errorOnInvalid) {
                throw Error('Invalid Input');
            }
            v = 0;
        }

        // Handle additional decimal for proper rounding.
        v = Number(v.toFixed(4));

        return useRounding ? round(v) : v;
    }
}

export default Currency;
