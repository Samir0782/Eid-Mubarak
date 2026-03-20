let isRevealed = false;
const circle = document.getElementById('reveal-circle');
const moon = document.getElementById('moon');
const meme = document.getElementById('meme-discovery');
const video = document.getElementById('eid-video');
const nextBtn = document.getElementById('next-btn');

const handleMove = (e) => {
    if (isRevealed) return;
    
    // Support both Touch and Mouse
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const y = e.touches ? e.touches[0].pageY : e.pageY;

    circle.style.display = 'block';
    circle.style.left = x + 'px'; 
    circle.style.top = y + 'px';

    // Meme Reveal logic
    const memeRect = meme.getBoundingClientRect();
    const distToMeme = Math.hypot(x - (memeRect.left + 70), y - (memeRect.top + 70));
    meme.style.opacity = (distToMeme < 90) ? "0.9" : "0";

    // Moon Collision logic
    const moonRect = moon.getBoundingClientRect();
    const distToMoon = Math.hypot(x - (moonRect.left + 40), y - (moonRect.top + 40));

    if (distToMoon < 50) { 
        triggerTransition();
    }
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
            
            // Next button shows after 10 seconds of playback
            video.onplay = () => {
                setTimeout(() => {
                    nextBtn.classList.add('visible');
                }, 10000); 
            };

            // If video ends, button appears immediately
            video.onended = () => {
                nextBtn.classList.add('visible');
            };

        }, 1300);
    }, 1000);
}

function goToPhase3() {
    document.getElementById('phase2').classList.remove('active');
    const ph3 = document.getElementById('phase3');
    ph3.style.display = 'flex';
    setTimeout(() => {
        ph3.classList.add('active');
    }, 100);
}

window.addEventListener('mousemove', handleMove);
window.addEventListener('touchmove', (e) => { 
    if(!isRevealed) e.preventDefault(); 
    handleMove(e); 
}, {passive: false});
