import * as Readline from 'readline';

let readline = null;

export function getApplicationReadline() {
    if (readline === null) {
        readline = Readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    readline.removeAllListeners();

    return readline;
}