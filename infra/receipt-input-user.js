import { getApplicationReadline } from './application-readline.js';

export async function getReceiptInputFromUser() {
    return new Promise(getReceiptInputFromUserPromise)
}

function getReceiptInputFromUserPromise(resolve) {
    const appReadline = getApplicationReadline();

    let orderData = [];
    
    appReadline.on('close', onClose);
    
    queryProduct();
    
    function onItemInput(item) {
        if (item.trim() !== '') {
            orderData.push(item);
            queryProduct();
        } else {
            resolve(orderData);
        }
        
    }
    
    function queryProduct() {
        appReadline.question('Enter the item of the basket ([NO DATA] will close the basket): ', onItemInput);
    }

    function onClose() {
        console.log('onClose ')
        if (appReadline.line) {
            orderData.push(appReadline.line);
            resolve(orderData);
        }
    }
}