const bird = document.getElementById('bird');
const message = document.getElementById('message');
const attemptsSpan = document.getElementById('attempts');
const resetBtn = document.getElementById('resetBtn');
const gameArea = document.querySelector('.game-area');

let attempts = 0;
let speed = 300;
let isMoving = false;

const messages = [
    'נסי לתפוס אותי!',
    'לא מהיר מספיק!',
    'חחחח החטאתי!',
    'אני מהירה יותר!',
    'כמעט!',
    'תנסי שוב!',
    'אני ציפור חכמה!',
    'לא תצליחי לתפוס אותי!',
    'מהר מהר!',
    'אוווופס!'
];

const sounds = ['🎵', '🎶', '💨', '✨', '⭐'];

function getRandomPosition() {
    const gameRect = gameArea.getBoundingClientRect();
    const maxX = gameRect.width - 80;
    const maxY = gameRect.height - 80;
    
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    return { x, y };
}

function movebird() {
    if (isMoving) return;
    
    isMoving = true;
    attempts++;
    attemptsSpan.textContent = attempts;
    
    const pos = getRandomPosition();
    bird.style.left = pos.x + 'px';
    bird.style.top = pos.y + 'px';
    bird.style.transform = 'none';
    
    bird.style.animation = 'none';
    setTimeout(() => {
        bird.style.animation = 'float 2s ease-in-out infinite';
    }, 10);
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    message.textContent = randomMessage;
    
    if (speed > 100) {
        speed -= 10;
    }
    
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    createParticle(pos.x + 40, pos.y + 40, randomSound);
    
    setTimeout(() => {
        isMoving = false;
    }, 300);
}

function createParticle(x, y, emoji) {
    const particle = document.createElement('div');
    particle.textContent = emoji;
    particle.style.position = 'absolute';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = '2em';
    particle.style.pointerEvents = 'none';
    particle.style.transition = 'all 1s ease-out';
    gameArea.appendChild(particle);
    
    setTimeout(() => {
        particle.style.transform = 'translateY(-100px)';
        particle.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

bird.addEventListener('mouseenter', movebird);
bird.addEventListener('touchstart', (e) => {
    e.preventDefault();
    movebird();
});

bird.addEventListener('click', (e) => {
    e.stopPropagation();
    bird.textContent = '😵';
    message.textContent = '🎉 תפסת אותי! יפה מאוד! 🎉';
    message.style.background = 'rgba(152, 251, 152, 0.9)';
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const x = Math.random() * gameArea.offsetWidth;
            const y = Math.random() * gameArea.offsetHeight;
            createParticle(x, y, '🎊');
        }, i * 100);
    }
    
    bird.style.animation = 'none';
    bird.style.cursor = 'default';
    bird.removeEventListener('mouseenter', movebird);
});

resetBtn.addEventListener('click', () => {
    attempts = 0;
    attemptsSpan.textContent = attempts;
    speed = 300;
    bird.textContent = '🐦';
    bird.style.cursor = 'pointer';
    bird.style.left = '50%';
    bird.style.top = '50%';
    bird.style.transform = 'translate(-50%, -50%)';
    bird.style.animation = 'float 2s ease-in-out infinite';
    message.textContent = 'נסי לתפוס אותי!';
    message.style.background = 'rgba(255, 255, 255, 0.9)';
    
    bird.removeEventListener('mouseenter', movebird);
    bird.addEventListener('mouseenter', movebird);
});