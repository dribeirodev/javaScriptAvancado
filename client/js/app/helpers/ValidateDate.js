class ValidateDate {
    constructor(text) {
        if (!this._valida(text)) throw new Error(`Data deve estar no formato aaaa-mm-dd`);
        this._text = text;
    }

    _valida(text) {
        return /\d{4}-\d{2}-\d{2}/.test(text);
    }

    get text() {
        return this._text;
    }
}