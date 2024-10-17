export default function init() {
    if (!localStorage.getItem('keys')) {
        localStorage.setItem('keys', JSON.stringify([]));
    }
}