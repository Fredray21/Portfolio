const EMAIL = 'dabadie.frederic@gmail.com';

export default function initContact() {
    const form = document.querySelector('.contact-form');
    const copyBtn = document.querySelector('.contact-copy');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const { name, message } = Object.fromEntries(new FormData(form));
        const params = new URLSearchParams({
            subject: `Contact portfolio - ${name}`,
            body: message,
        }).toString().replaceAll('+', '%20');

        location.href = `mailto:${EMAIL}?${params}`;
    });

    copyBtn.addEventListener('click', async () => {
        const label = copyBtn.textContent;
        try {
            await navigator.clipboard.writeText(EMAIL);
            copyBtn.textContent = 'Copié !';
        } catch {
            copyBtn.textContent = 'Copie impossible';
        }
        setTimeout(() => { copyBtn.textContent = label; }, 2000);
    });
}
