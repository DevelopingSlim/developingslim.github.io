const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');
const toggleButton = document.getElementById('toggleButton');
const toggleBall = document.querySelector('.toggle-ball');

let mode = 'encode'; // Default mode is encoding

// Function to toggle between encoding and decoding modes
const toggleMode = () => {
    toggleButton.checked = !toggleButton.checked; // Toggle checkbox state
    toggleButtonText(); // Update button text based on mode
    mode = mode === 'encode' ? 'decode' : 'encode'; // Toggle mode
    cifrador.reset(); // Reset the form
    resultado.innerHTML = ''; // Clear the result
};

// Function to update button text based on mode
const toggleButtonText = () => {
    const modeText = document.querySelector('.toggle-label');
    modeText.textContent = mode === 'encode' ? 'Coding' : 'Decoding';
};

// Function to encode or decode text
const shiftMessage = () => {
    const wordArray = [...inputOriginal.value.toUpperCase()];
    printChar(0, wordArray);
};

// Function to print each character with animation
const printChar = (currentLetterIndex, wordArray) => {
    if(wordArray.length === currentLetterIndex) return;
    const charSinCodificar = wordArray[currentLetterIndex];
    if (charSinCodificar === ' ') {
        resultado.appendChild(document.createTextNode(' '));
        printChar(currentLetterIndex + 1, wordArray);
        return;
    }
    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    animateChar(spanChar)
        .then( () => {
            spanChar.innerHTML = mode === 'encode' ? // Check mode for encoding or decoding
                alfabeto[(alfabeto.indexOf(charSinCodificar) - parseInt(rango.value) + alfabeto.length) % alfabeto.length] : 
                alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length];
            printChar(currentLetterIndex + 1, wordArray);
        });
};

// Animar cada caracter para print
const animateChar = spanChar => {
    let cambiosDeLetra = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetra++;
            if(cambiosDeLetra === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
};

const submit = e => {
    e.preventDefault();
    resultado.innerHTML = '';
    shiftMessage();
};

cifrador.onsubmit = submit;

// Listener para el swipe button
toggleBall.addEventListener('click', toggleMode);

//Hide the loading circle after 0.7s
setTimeout(function() {
    document.querySelector('.loading-screen').style.display = 'none';
}, 700);
