function generatePassword() {
    const length = document.getElementById('length').value;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;

    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()-=_+[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('password').value = password;
    updateLengthDisplay(length);
}

function updateLengthDisplay(length) {
    document.getElementById('lengthDisplay').textContent = length;
}

document.getElementById('length').addEventListener('input', function() {
    updateLengthDisplay(this.value);
});

function copyToClipboard() {
    const password = document.getElementById('password').value;
    navigator.clipboard.writeText(password)
        .then(() => {
            displayMessage('Password copied to clipboard', 'success');
        })
        .catch(err => {
            console.error('Failed to copy password: ', err);
            displayMessage('Failed to copy password', 'error');
        });
}
