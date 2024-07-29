let speech = new SpeechSynthesisUtterance();
let btn = document.querySelector("button");
let textArea = document.querySelector("textarea");
let voices = [];
let voiceSelect = document.querySelector("select");

let isPaused = false; // Add this flag

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });

    voiceSelect.addEventListener("change", () => {
        speech.voice = voices[voiceSelect.value];
    });
}

btn.addEventListener("click", () => {
    if (window.speechSynthesis.speaking) {
        if (isPaused) {
            window.speechSynthesis.resume();
            btn.innerHTML = `<i class="fa-solid fa-pause"></i>Pause`;
            isPaused = false; // Update the flag
        } else {
            window.speechSynthesis.pause();
            btn.innerHTML = `<i class="fa-solid fa-play"></i>Listen`;
            isPaused = true; // Update the flag
        }
    } else {
        speech.text = textArea.value;
        window.speechSynthesis.speak(speech);
        btn.innerHTML = `<i class="fa-solid fa-pause"></i>Pause`;
        isPaused = false; // Reset the flag
    }
});

speech.addEventListener("end", () => {
    btn.innerHTML = `<i class="fa-solid fa-play"></i>Listen`;
});
