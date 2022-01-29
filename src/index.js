const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

const chunk = (arr, chunkSize = 1, cache = []) => {
    const tmp = [...arr];
    if (chunkSize <= 0) return cache;
    while (tmp.length) cache.push(tmp.splice(0, chunkSize));
    return cache;
}

function decode(expr) {
    const exprArray = (chunk(expr.split(''), 10));
    const lettersArray = [];
    let arrayWithoutEmptySigns;
    let morseSignArray = [];
    let result = '';

    for (let letter of exprArray) {
        let letterArray = chunk(letter, 2);
        let resultArray = []

        for (const letter of letterArray) {
            resultArray.push(letter.join(''));
        }
        
        lettersArray.push(resultArray);
    }    

    arrayWithoutEmptySigns = lettersArray.map(sign => {
        return sign.filter(sign => sign !== '00');
    })

    arrayWithoutEmptySigns.forEach(sign => {
        sign = sign.map(sign => {
                if (sign === '10') {
                    return '.';
                } else if (sign === '11') {
                    return '-';
                }
            }).join('')
        morseSignArray.push(sign);
    });

    for (const code of morseSignArray) {
        console.log(MORSE_TABLE[code]);
        if (MORSE_TABLE[code] === undefined) {
            result += ' ';
        } else {
            result += MORSE_TABLE[code];
        }        
    }

    return result;
}

module.exports = {
    decode
}