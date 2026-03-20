let isRevealed = false;
const circle = document.getElementById('reveal-circle');
const moon = document.getElementById('moon');
const meme = document.getElementById('meme-discovery');
const video = document.getElementById('eid-video');
const nextBtn = document.getElementById('next-btn');

const handleMove = (e) => {
    if (isRevealed) return;
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const y = e.touches ? e.touches[0].pageY : e.pageY;
    
    circle.style.display = 'block';
    circle.style.left = x + 'px'; 
    circle.style.top = y + 'px';

    // Meme Reveal
    const memeRect = meme.getBoundingClientRect();
    const distMeme = Math.hypot(x - (memeRect.left + 65), y - (memeRect.top + 65));
    meme.style.opacity = (distMeme < 85) ? "0.9" : "0";

    // Moon Reveal
    const moonRect = moon.getBoundingClientRect();
    const distMoon = Math.hypot(x - (moonRect.left + 40), y - (moonRect.top + 40));
    if (distMoon < 50) triggerTransition();
};

function triggerTransition() {
    isRevealed = true;
    moon.style.opacity = '1';
    document.getElementById('hint-text').innerText = "Moon Sighted! ✨";
    
    setTimeout(() => {
        circle.classList.add('portal-zoom');
        setTimeout(() => {
            document.getElementById('phase1').style.display = 'none';
            document.getElementById('phase2').classList.add('active');
            video.play();
            // Show Next Button after 20 seconds
            setTimeout(() => nextBtn.classList.add('visible'), 20000); 
        }, 1300);
    }, 1000);
}

function goToPhase3() {
    document.getElementById('phase2').classList.remove('active');
    document.getElementById('phase3').classList.add('active');
}

window.addEventListener('mousemove', handleMove);
window.addEventListener('touchmove', (e) => { 
    e.preventDefault(); 
    handleMove(e); 
}, {passive: false});
