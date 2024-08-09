let currentAudio = null; // Variable to keep track of the currently playing audio

// Function to create a <div> for each sound file
function createDivs(sounds) {
    const container = document.getElementById('soundButton'); // Ensure this ID matches your HTML
    sounds.forEach(sound => {
        const div = document.createElement('div');
        div.textContent = sound.replace('.mp3', '');
        // div.classList.add('sound-button'); // Optionally add a class for styling
        div.addEventListener('click', () => toggleSound(sound));
        container.appendChild(div);
    });
}

// Function to play or stop the sound
function toggleSound(soundFile) {
    if (currentAudio) {
        currentAudio.pause(); // Stop the currently playing sound
        currentAudio.currentTime = 0; // Reset the sound to the beginning
        currentAudio = null; // Clear the current audio reference
    }

    if (!currentAudio || currentAudio.src.endsWith(soundFile)) {
        const audio = new Audio(`sounds/${soundFile}`);
        currentAudio = audio;
        audio.play();
        audio.addEventListener('ended', () => {
            currentAudio = null; // Clear reference when the sound ends
        });
    }
}

// Fetch the list of sound files from sounds.json and create divs
fetch('./sounds.json')
    .then(response => response.json())
    .then(sounds => {
        createDivs(sounds);
    })
    .catch(error => console.error('Error fetching sound files:', error));