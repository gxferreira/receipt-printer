import { EOL } from 'os';

export class ShoppingBasket {
    _itens;
    
    get itens() {
        return this._itens;
    }
    set itens(value) {
        this._itens = value;
    }

    printBasket() {
        const { itens } = this;

        const salesTaxes = itens.reduce(
            (_salesTaxes, item) => {
                _salesTaxes += item.getTaxes();
                return _salesTaxes;
            }, 0
        );

        const total = itens.reduce(
            (_total, item) => {
                _total += item.getFullPrice();
                return _total;
            }, 0
        )

        itens.forEach((item) => item.printItem()); 
        console.log(`Sales Taxes: ${salesTaxes.toFixed(2)}`);
        console.log(`Total: ${total.toFixed(2)}`);
    }
}