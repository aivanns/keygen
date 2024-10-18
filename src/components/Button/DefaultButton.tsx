import { Button } from "antd";
import './DefaultButton.css';

export default function DefaultButton({ text, onClick }: { text: string, onClick: () => Promise<void> }) {
    return (
        <Button className="custom-button bg-color-4" type="primary" onClick={onClick}>
            {text}
        </Button>
    )
}
