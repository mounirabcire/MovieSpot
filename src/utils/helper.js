// Generate random uniqe numbers
// 1-Using arrays
export function randomUniqueNumsArr(length, max) {
    const arr = [];

    while (length > arr.length) {
        const randomNum = Math.floor(Math.random() * (max + 1));
        if (arr.indexOf(randomNum) === -1) arr.push(randomNum);
    }

    return arr;
}

// 2-Using Sets
export function randomUniqueNumsSet(length, max) {
    const set = new Set();
    while (length > set.size) {
        const randomNum = Math.floor(Math.random() * (max + 1));
        set.add(randomNum);
    }

    return Array.from(set);
}

// Generate maximum text length
export function maxTextProvider(text, maxTextLength) {
    if (maxTextLength >= text.length) return text;

    return text.substr(0, maxTextLength) + "...";
}
