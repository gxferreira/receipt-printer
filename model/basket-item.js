export const TaxRegulationTypes = {
    REGULAR: 'REGULAR',
    EXEMPT: 'EXEMPT'
}

export class BasketItem {
    _netPrice = 0.0;
    _quantity = 0;
    _itemDescription = '';
    _imported = false;
    _taxRegulation = TaxRegulationTypes.REGULAR;
    
    get imported() {
        return this._imported;
    }

    get netPrice() {
        return this._netPrice;
    }
    set netPrice(value) {
        this._netPrice = value;
    }

    get quantity() {
        return this._quantity;
    }
    set quantity(value) {
        this._quantity = value;
    }

    get itemDescription() {
        return this._itemDescription;
    }
    set itemDescription(value) {
        if (value.includes('imported')) {
            this._imported = true;
        }

        this._itemDescription = value;
    }

    get taxRegulation() {
        return this._taxRegulation;
    }
    set taxRegulation(value) {
        this._taxRegulation = value;
    }

    getTaxes() {
        const { taxRegulation, imported, netPrice, quantity } = this;
        const { EXEMPT } = TaxRegulationTypes;

        const baseTax = taxRegulation === EXEMPT ? 0 : netPrice * 0.1;
        const importedTax = imported ? netPrice * 0.05 : 0;

        return quantity * roundUpValue(baseTax + importedTax);

        function roundUpValue(value) {
            return (Math.ceil((value)*20)/20 ).toFixed(2)
        }
    }

    getFullPrice() {
        const { netPrice, quantity } = this;

        return (quantity * netPrice) + this.getTaxes();
    }

    printItem() {
        const { quantity, itemDescription } = this;

        console.log(`${quantity} ${itemDescription} at ${this.getFullPrice().toFixed(2)}`);
    }
}