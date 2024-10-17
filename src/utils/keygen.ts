function randomValue(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}
async function getWords(): Promise<string> {
    const response = await fetch('/src/static/output.txt');
    const data = await response.text();
    return data;
}

export default async function generateKey(): Promise<string> {
    let seed: string[] = [];
    const words: string = await getWords();
    const wordList: string[] = words.split('\n'); // Разделяем слова по строкам
    for (let i = 0; i < 12; i++) {
        seed[i] = wordList[randomValue(0, wordList.length - 1)]; // Выводим каждое из первых 12 слов
    }
    console.log(seed.join(' '));
    return seed.join(' ');
}   

