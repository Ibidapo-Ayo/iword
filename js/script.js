const searchBtn = document.getElementById("searchBtn");
const words = document.getElementById("words");
let bodyfont = document.getElementById("bodyfont");
const fonts = document.getElementById("fonts")

bodyfont.style.fontFamily = fonts.value;




const searchWord = async () => {
  const playButton = document.getElementById("playButton");
  const audio = document.getElementById("audio");
  const playIcon = document.getElementById("playBtn");
  const pauseIcon = document.getElementById("pauseBtn");
  ;
 
  let audioSrc;
  const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${words.value}`;

  if (words.value.trim() === "") {
    alert("Enter word...");
  } else {
    words.value = "";
    document.getElementById("ovalSpinner").classList.remove("hidden");
    await fetch(URL)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        document.getElementById("ovalSpinner").classList.add("hidden");

        const audio = data[0].phonetics;

        const meaning = data[0];

        const audioFilter = meaning.phonetics.filter(
          audio => audio.audio !== ""
        );
        audioSrc = audioFilter[0].audio;

        document.getElementById("word").textContent = meaning.word; //The title of the searched word
        const phoneticsFilter = meaning.phonetics.filter(
          phonetics => phonetics.text !== undefined
        );

        document.getElementById("phonetics").textContent =
          phoneticsFilter[0].text;

        const wordMeaning = meaning.meanings
          .map(means => {
            return `${means.definitions
              .map(means2 => {
                return `
              <ul id="meaning" class="list-style-type"><li>${means2.definition}</li></ul>
              `;
              })
              .join("")} 
        <p class="text-gray-600 mt-5">Synonyms</p>
        <p id="synonyms" class="font-bold italic">${means.partOfSpeech}</p>
        `;
          })
          .join("");
        document.getElementById("meaningEl").innerHTML = `
      <p class="text-gray-600" id="meaningTitle">Meaning</p>
      ${wordMeaning}
      `;

        document.getElementById("sourcesEl").innerHTML = `
    <p class="text-gray-600 mt-5">Source Url</p>

    <p id="source" class=" italic">${meaning.sourceUrls[0]}
   <a href="${
     meaning.sourceUrls
   }" target="_blank"> <i class='bx bx-link-external'></i></a>
    
    </p>
    
    `;
      })
      .catch(err => {
        console.log(err);
        document.getElementById("ovalSpinner").classList.add("hidden");
      });

    audio.src = audioSrc;
    function TooglePlayBtn() {
      playIcon.classList.toggle("hidden");
      pauseIcon.classList.toggle("hidden");
    }

    function playAudio() {
      audio.play();
      TooglePlayBtn();
    }
    function pauseAudio() {
      audio.pause();
      TooglePlayBtn();
    }

    playButton.addEventListener("click", () => {
      if (audio.paused) {
        playAudio();
      } else {
        pauseAudio();
      }
      playAudio();
    });

    fonts.addEventListener("change", () => {
      console.log(fonts.value);
      bodyfont.style.fontFamily = fonts.value;
    });
  }
};

searchBtn.addEventListener("click", searchWord);
