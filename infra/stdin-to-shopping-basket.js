import { BasketItem, TaxRegulationTypes } from '../model/basket-item.js';
import { ShoppingBasket } from '../model/shopping-basket.js'


export function fromStdinToShoppingBasket(stindInput) {
    if (Array.isArray(stindInput)) {
        const shoppingBasket = new ShoppingBasket();
        shoppingBasket._itens = stindInput.map(
            (input) => fromStdinLineToBasketItem(input)
        )

        return shoppingBasket;
    } else {
        throw new Error('Error in user input!');
    }
}

function fromStdinLineToBasketItem(stindInputLine) {
    const basketItemType = typeof stindInputLine === 'string';
    if (basketItemType) {
        const { 1: netPrice, ...remainingStdin } = stindInputLine.split(' at ');
        
        if (isNaN(netPrice)) {
            throw new Error('Error to get [price] from input!');
        }

        const basketItem = new BasketItem();
        basketItem.netPrice = +netPrice;

        const { 0: quantity, ...itemDescriptionReamining } = remainingStdin[0].split(' ');
        const itemDescription = Object.values(itemDescriptionReamining).join(' ');


        if (isNaN(quantity) || !itemDescription) {
            throw new Error('Error to get [quantity] or/and [itemDescription] from input!');
        }

        basketItem.taxRegulation = getTaxRegulationFromDescription(itemDescription);
        basketItem.quantity = +quantity;
        basketItem.itemDescription = itemDescription;

        return basketItem;
    }

    throw new Error(`Unkown type for basket item! (${basketItemType})`);
}

/**
 * The type of the item seemed to change easily based on the options, 
 * so I preffered to keep declouped from the item class
 */
function getTaxRegulationFromDescription(itemDescription) {
    const {EXEMPT, REGULAR} = TaxRegulationTypes;

    if (isFood() || isBook() || isMedicine()) {
        return EXEMPT;
    }

    return REGULAR;

    function isFood() {
        /**
         * For now, there is only [chocolate],
         * but later it can be added another descriptions
         * */
        return itemDescription.includes('chocolate');
    }

    function isMedicine() {
        /**
         * For now, there is only [pills],
         * but later it can be added another descriptions
         * */
        return itemDescription.includes('pills');
    }

    function isBook() {
        return itemDescription.includes('book');
    }
}