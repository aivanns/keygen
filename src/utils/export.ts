export default async function exportKeysToClipboard(): Promise<void> {
    try {
        const keys = JSON.parse(localStorage.getItem('keys') || '[]');
        const toExport = `${keys.map((key: any) => `${key.name}\n${key.hash}\n${key.key}\n${key.seed.join(' ')}\n`).join('\n')}`
        await navigator.clipboard.writeText(toExport);
        console.log('Текст успешно скопирован!');
    } catch (err) {
        console.error('Ошибка при копировании текста: ', err);
    }
}
