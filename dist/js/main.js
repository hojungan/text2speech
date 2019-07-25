// Initialize speechsynth api
const synth = window.speechSynthesis;

//DOM elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");

// Init voices array
let voices = [];

let getVoices = () => {
  voices = synth.getVoices();

  console.log(voices);
  //Insert voices into voice-select
  console.log(voiceSelect.children.length);
  voices.forEach(voice => {
    // create option element
    const option = document.createElement("option");
    option.textContent = voice.name + "(" + voice.lang + ")";
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};


// Speak
const speak = () => {
  if (synth.speaking) {
    console.error("Already speaking");
    return;
  }
  if (textInput.value != "") {
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = e => {
      console.log("Done speaking");
    };

    speakText.onerror = e => {
      console.error("Something went wrong");
    };

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    voices.forEach(voice => {
      if (voice.name == selectedVoice) {
        speakText.voice = voice;
      }
    });

    //set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //speak
    synth.speak(speakText);
  }
};

getVoices();
if(speechSynthesis.onvoiceschanged !== undefined){
    speechSynthesis.onvoiceschanged = getVoices;
}


//event listeners

//text form submit
textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// rate value change
rate.addEventListener("change", e => {
  rateValue.textContent = rate.value;
});

// pitch value change
pitch.addEventListener("change", e => {
  pitchValue.textContent = pitch.value;
});

// voice select change
voiceSelect.addEventListener("change", e => {
  speak();
});
