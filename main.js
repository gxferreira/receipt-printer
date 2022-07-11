import { fromStdinToShoppingBasket } from './infra/stdin-to-shopping-basket.js';
import { getReceiptInputFromUser } from './infra/receipt-input-user.js';
import { EOL } from 'os';
import { getApplicationReadline } from './infra/application-readline.js';

main();

async function main() {
    const baskedStdinInput = await getReceiptInputFromUser();

    const shoppingBasket = fromStdinToShoppingBasket(baskedStdinInput);

    console.log(EOL + 'SHOPPING BASKET RECEIPT');
    
    shoppingBasket.printBasket();

    askToContinue();
}

function askToContinue() {
    const appReadline = getApplicationReadline();

    appReadline.question('Do you want enter another basket? (Y/y to continue) ', (answer) => {
        if(answer.toLocaleLowerCase() === 'y') {
            main();
        } else {
            process.exit();
        }
    });
}