function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

export default function initMusicBlock() {
    const block = document.querySelector('#block2');
    const image = block.querySelector('.block2-image');
    const imageWrapper = block.querySelector('.block2-img-wrapper');
    const toggleBtn = block.querySelector('.block2-btn-toggle');
    const nextBtn = block.querySelector('.block2-btn-next');
    const title = block.querySelector('.block2-text-title');
    const artist = block.querySelector('.block2-text-artist');
    const duration = block.querySelector('.block2-text-duration');
    const progressBar = block.querySelector('.block2-text-bar_filled');
    const curve = block.querySelector('.curved-progress svg');
    const curvePaths = curve.querySelectorAll('path');
    const curveLine = block.querySelector('.progress-line');

    const audio = new Audio();
    let playlist = [];
    let currentTrackIndex = 0;

    function drawCurve() {
        const width = curve.clientWidth;
        if (!width) return;

        const start = Math.min(width * 0.43, width - 125);
        curve.setAttribute('viewBox', `0 0 ${width} 44`);
        curvePaths.forEach((path) => {
            path.setAttribute('d', `M0 2H${start}A20 20 0 0 1 ${start + 20} 22A20 20 0 0 0 ${start + 40} 42H${width}`);
        });
    }

    function setProgress(ratio) {
        progressBar.style.width = `${ratio * 100}%`;
        curveLine.style.strokeDashoffset = 1 - ratio;
    }

    function updateProgress() {
        const total = audio.duration || 30;
        duration.textContent = `${formatTime(audio.currentTime)} / ${formatTime(total)}`;
        setProgress(audio.currentTime / total);
    }

    function setPlaying(isPlaying) {
        toggleBtn.classList.toggle('playing', isPlaying);
        toggleBtn.setAttribute('aria-label', isPlaying ? 'Mettre en pause' : 'Lire l\'extrait');
    }

    function playTrack() {
        audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }

    function pauseTrack() {
        audio.pause();
        setPlaying(false);
    }

    function loadTrack(index, autoplay = false) {
        currentTrackIndex = index % playlist.length;
        const track = playlist[currentTrackIndex];
        const artists = track.artists.map(a => a.name).join(', ');

        imageWrapper.classList.add('loading');
        image.onload = () => imageWrapper.classList.remove('loading');
        image.src = track.album?.image || track.artists?.[0]?.image || '';
        image.alt = `Pochette de ${track.name}`;

        title.textContent = track.name;
        title.title = track.name;
        artist.textContent = artists;
        artist.title = artists;

        duration.textContent = '0:00 / 0:00';
        setProgress(0);
        audio.src = track.spotifyPreview;

        if (autoplay) playTrack();
    }

    function showUnavailable() {
        imageWrapper.classList.remove('loading');
        title.textContent = 'Musique indisponible';
        toggleBtn.disabled = true;
        nextBtn.disabled = true;
    }

    toggleBtn.addEventListener('click', () => {
        if (!audio.src) return;
        if (audio.paused) playTrack();
        else pauseTrack();
    });

    nextBtn.addEventListener('click', () => {
        if (playlist.length) loadTrack(currentTrackIndex + 1, !audio.paused);
    });

    audio.addEventListener('ended', () => setPlaying(false));
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);

    window.addEventListener('viewchange', ({ detail }) => {
        if (detail.name !== 'accueil') pauseTrack();
    });

    new ResizeObserver(drawCurve).observe(curve);

    fetch('https://api.stats.fm/api/v1/users/ptfred2104/streams/recent')
        .then(res => res.json())
        .then(data => {
            playlist = data.items
                .map(item => item.track)
                .filter(track => track.spotifyPreview);

            if (playlist.length) loadTrack(0);
            else showUnavailable();
        })
        .catch(err => {
            console.error('Erreur API:', err);
            showUnavailable();
        });
}
