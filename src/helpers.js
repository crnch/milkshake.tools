import 'ethers';

// extended euclidean algorithm to determine the greatest common divisor
function calcGcd(a, b) {
    //return (g, x, y) such that a*x + b*y = g = egcd(a, b)
    if (a === 0) {
        return {"gcd": b, "x": 0, "y":1}
    } else {
        const [b_div_a, b_mod_a] = divmod(b, a)
        const {gcd, x, y} = calcGcd(b_mod_a, a)
        return {"gcd": gcd, "x": y - b_div_a * x,"y": x}
    }
}

function divmod(b, a) {
    const m = b % a;
    return [(b - m)/a,  m]
}

export function isRelativePrime(a, b=2048) {
    const {gcd} = calcGcd(a, b);
    return (gcd === 1)
}

function modInv(a, b=2048) {
    //return x such that (x * a) % b == 1
    const {gcd, x} = calcGcd(a, b)
    if (gcd !== 1) {
        throw Error('gcd(a, b) != 1')
    }
    if (x < 0) {
        // modulus of a negative integer is defined differently in js and py
        return x + 2048
    } else {
        return x % b
    }
}

export function getEncoded(phrase, key, wordlist) {
    return phrase.map((word) => {
        const index = wordlist.getWordIndex(word);
        return wordlist.getWord((index * key) % 2048)
    });
}

export function getDecoded(phrase, key, wordlist) {
    return getEncoded(phrase, modInv(key), wordlist);
}
