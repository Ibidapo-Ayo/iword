const searchBtn = document.getElementById("searchBtn");
const words = document.getElementById("words");

const searchWord = async () => {
  const playButton = document.getElementById("playButton");
  const audio = document.getElementById("audio");
  const playIcon = document.getElementById("playBtn");
  const pauseIcon = document.getElementById("pauseBtn");
  let audioSrc;
  const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${words.value}`;
  if (words.value.trim() === "") {
    alert("Enter word...");
  } else {
    await fetch(URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        const audio = data[0].phonetics[0].audio;
        audioSrc = audio;
        const meaning = data[0];

        document.getElementById("word").textContent = meaning.word;

        const phoneticsFilter = meaning.phonetics.filter(
          phonetics => phonetics.text !== undefined
        );

        // console.log(phoneticsFilter);
        document.getElementById("phonetics").textContent =
          phoneticsFilter[0].text;

        const wordMeaning = meaning.meanings
          .map(means => {
            return `${means.definitions.map(means2 => {
              return `
              <ul id="meaning" class="list-style-type"><li>${means2.definition}</li></ul>
              `;
            })} 
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
    });
  }
};

searchBtn.addEventListener("click", searchWord);
