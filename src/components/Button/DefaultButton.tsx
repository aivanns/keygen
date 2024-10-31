import { Button } from "antd";
import './DefaultButton.css';
import { EGenTable } from '../../shared/enums/table';

export default function DefaultButton({ text, onClick, options }: { text: string, onClick: (options: EGenTable[]) => Promise<void>, options: EGenTable[] }) {
    return (
        <Button className="custom-button bg-color-4" type="primary" onClick={() => onClick(options)}>
            {text}
        </Button>
    )
}
