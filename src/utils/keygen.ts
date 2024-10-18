import sha1 from 'crypto-js/sha1';
import sha256 from 'crypto-js/sha256';
import sha3 from 'crypto-js/sha3';
import { KeyItem } from '../types/Items';

function randomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getWords(): Promise<string> {
    const response = await fetch('/src/static/output.txt');
    const data = await response.text();
    return data;
}

function getKeys(): KeyItem[] {
    const keys = localStorage.getItem('keys');
    return keys ? JSON.parse(keys) : [];
}

function saveKeys(keys: KeyItem[]): void {
    localStorage.setItem('keys', JSON.stringify(keys));
}

export default async function generateKey(name: string, hash: string): Promise<void> {
    let seed: string[] = [];
    const words: string = await getWords();
    const wordList: string[] = words.split('\n');
    for (let i = 0; i < 12; i++) {
        const a: string = wordList[randomValue(0, wordList.length - 1)].trim();
        if (a && !seed.includes(a)) {
            seed.push(a);
        } else {
            i--;
        }
    }
    let key: string;
    switch (hash) {
        case 'sha1':
            key = sha1(seed.join(' ')).toString();
            break;
        case 'sha256':
            key = sha256(seed.join(' ')).toString();
            break;
        case 'sha3':
            key = sha3(seed.join(' ')).toString();
            break;
        default:
            throw new Error('Unknown hash type');
    }

    const newKey: KeyItem = {
        id: Date.now(),
        name: name,
        hash: hash,
        seed: seed,
        key: key
    };

    const keys = getKeys();
    keys.push(newKey);
    saveKeys(keys);
}
