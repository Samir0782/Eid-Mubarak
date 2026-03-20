let isRevealed = false;
const searchArea = document.getElementById('search-area');
const circle = document.getElementById('reveal-circle');
const moon = document.getElementById('moon');
const meme = document.getElementById('meme-discovery');
const hint = document.getElementById('hint-text');

const handleMove = (e) => {
    if (isRevealed) return;
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const y = e.touches ? e.touches[0].pageY : e.pageY;

    circle.style.display = 'block';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';

    // Meme Reveal
    const memeRect = meme.getBoundingClientRect();
    const distToMeme = Math.hypot(x - (memeRect.left + 65), y - (memeRect.top + 65));
    meme.style.opacity = (distToMeme < 85) ? "0.9" : "0";

    // Moon Reveal & Transition
    const moonRect = moon.getBoundingClientRect();
    const distToMoon = Math.hypot(x - (moonRect.left + 40), y - (moonRect.top + 40));

    if (distToMoon < 50) { 
        triggerTransition();
    }
};

function triggerTransition() {
    isRevealed = true;
    moon.style.opacity = '1';
    hint.innerText = "Moon Sighted! ✨";
    
    setTimeout(() => {
        circle.classList.add('portal-zoom');
        setTimeout(() => {
            document.getElementById('phase1').style.display = 'none';
            const phase2 = document.getElementById('phase2');
            phase2.style.display = 'flex';
            phase2.classList.add('active');
            
            const video = document.getElementById('eid-video');
            video.play();
            video.onended = () => document.getElementById('next-btn').classList.remove('hidden');
        }, 1300);
    }, 1000);
}

searchArea.addEventListener('mousemove', handleMove);
searchArea.addEventListener('touchmove', (e) => { e.preventDefault(); handleMove(e); }, {passive: false});
