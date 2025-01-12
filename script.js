const pins = Array.from(document.querySelectorAll('.pin'));
const ganzua = document.getElementById('ganzua');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');
let isUnlocking = false;
let unlockedPins = 0;

// Posiciones correctas para los pines
const correctPositions = [100, 120, 140, 160, 180];  // Estos son los valores que los pines deben alcanzar

// Mover la ganzúa
function moveGanzua(event) {
    if (!isUnlocking) return;

    // Mover la ganzúa verticalmente con el ratón
    let mouseY = event.clientY - gameContainer.offsetTop;
    if (mouseY < 0) mouseY = 0;
    if (mouseY > 200) mouseY = 200;

    ganzua.style.top = mouseY + "px";
}

// Comprobar si la ganzúa toca correctamente el pin
function checkPin() {
    if (!isUnlocking) return;

    let ganzuaTop = ganzua.offsetTop;
    let isCorrect = false;

    // Comprobar si la ganzúa está sobre la posición correcta del pin
    pins.forEach((pin, index) => {
        const pinTop = pin.offsetTop;
        const pinHeight = pin.offsetHeight;
        const pinPosition = correctPositions[index];

        if (Math.abs(ganzuaTop - pinPosition) < 10 && pinTop === 0) {
            pin.style.bottom = pinPosition + "px";
            unlockedPins++;
            if (unlockedPins === pins.length) {
                message.textContent = "¡La cerradura está abierta!";
                message.style.color = "green";
                isUnlocking = false;
            }
        }
    });
}

// Iniciar el desbloqueo
function startUnlocking() {
    isUnlocking = true;
    unlockedPins = 0;
    pins.forEach(pin => pin.style.bottom = '0px');
    message.textContent = "Moviendo la ganzúa...";
}

// Reiniciar el juego
function resetGame() {
    isUnlocking = false;
    unlockedPins = 0;
    pins.forEach(pin => pin.style.bottom = '0px');
    message.textContent = "Usa la ganzúa para mover los pines a su posición correcta.";
    message.style.color = "black";
    ganzua.style.top = "0px";
}

// Añadir eventos
document.addEventListener('mousemove', moveGanzua);
document.addEventListener('click', checkPin);
resetBtn.addEventListener('click', resetGame);

// Iniciar el juego al cargar
startUnlocking();
