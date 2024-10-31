import { EGenTable } from "../shared/enums/table";

export default async function exportKeysToClipboard(options: EGenTable[]): Promise<void> {
    try {
        const keys = JSON.parse(localStorage.getItem('keys') || '[]');
        if (options.length === 0) {
            throw new Error('No options selected');
        }

        const toExport = `${keys.map((key: any) => {
            let result = '';

            options.forEach((option) => {
                switch (option) {
                    case EGenTable.NAME: result += `${key.name}\n`; break;
                    case EGenTable.HASH: result += `${key.hash}\n`; break;
                    case EGenTable.SEED: result += `${key.seed.join(' ')}\n`; break;
                    case EGenTable.KEY: result += `${key.key}\n`; break;
                    default: break;
                }
            })
            return result;
        }).join('\n')}`

        await navigator.clipboard.writeText(toExport);
    } catch (err) {
        throw err;
    }
}
