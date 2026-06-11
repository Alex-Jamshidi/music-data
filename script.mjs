import { getUserIDs, getSong, getListenEvents } from "./data.mjs";

// ======================================================
// ----- DOMS
// ======================================================
const userSelect = document.getElementById("user-select");
const questionContainer = document.getElementById("question-container");

// ======================================================
// ----- Setup and Render
// ======================================================
const users = getUserIDs();

function setup() {
  userSelect.value = "";
  render("no user");
}

function render(currentUserId) {
  if (!users.includes(currentUserId)) return;
  const questionsAll = computeAnswers(currentUserId);
  displayQuestions(questionsAll);
}

// ======================================================
// ----- Front End
// ======================================================

// Checks for change of user
userSelect.addEventListener("change", function (option) {
  const currentUserId = userSelect.value;
  render(currentUserId);
});

// Creates and display all questions/answers
export function displayQuestions(questionsAll) {
  const questionElements = questionsAll.map(createQuestion);
  questionContainer.replaceChildren(...questionElements);
}

// Creates single question/answer clone fragment
function createQuestion(item) {
  const template = document.getElementById("question-template");
  const clone = template.content.cloneNode(true);

  clone.querySelector(".question-item").textContent = item.question;
  clone.querySelector(".answer-item").textContent = item.answer;

  return clone;
}

// ======================================================
// ----- Back End
// ======================================================

export function computeAnswers(userId) {
  const listenEvents = getListenEvents(userId);
  if (!listenEvents || listenEvents.length === 0)
    return [{ answer: "This user didn't listen to any songs." }];

  const questionsAll = [];
  questionsAll.push(mostListenedSongCount(listenEvents));
  questionsAll.push(mostListenedSongTime(listenEvents));
  questionsAll.push(mostListenedArtistCount(listenEvents));
  questionsAll.push(mostListenedArtistTime(listenEvents));

  const fridayNightEvents = listenEvents.filter((event) => {
    const date = new Date(event.timestamp);
    const day = date.getDay();
    const hour = date.getHours();
    return (day === 5 && hour >= 17) || (day === 6 && hour < 4);
  });

  if (fridayNightEvents.length > 0) {
    questionsAll.push(mostListenedFridaySongCount(fridayNightEvents));
    questionsAll.push(mostListenedFridaySongTime(fridayNightEvents));
  }

  questionsAll.push(longestStreakSong(listenEvents));

  return questionsAll;
}

function tallyData(objects, key) {
  return objects.reduce((tally, event) => {
    const item = event[key];
    tally[item] = (tally[item] || 0) + 1;
    return tally;
  }, {});
}

function getHighestKey(tallyObject) {
  let highestKey = "";
  let highestValue = -Infinity;

  for (const [key, value] of Object.entries(tallyObject)) {
    if (value > highestValue) {
      highestValue = value;
      highestKey = key;
    }
  }

  return highestKey;
}

function addData(listenEvents, key) {
  return listenEvents.map((event) => {
    const song = getSong(event.song_id);
    return {
      ...event,
      [key]: song ? song[key] : "Unknown",
    };
  });
}

// ======================================================
// ----- Question Functions
// ======================================================

function mostListenedSongCount(songs) {
  const mostListenedTally = tallyData(songs, "song_id");
  const mostListenedSongId = getHighestKey(mostListenedTally);
  const mostListenedSong = getSong(mostListenedSongId);

  return {
    question: `Most listened song (count)`,
    answer: `${mostListenedSong.title} - ${mostListenedSong.artist}`,
  };
}

function mostListenedSongTime(songs) {
  const mostListenedTally = tallyData(songs, "song_id");

  const mostListenedTallyTime = Object.entries(mostListenedTally).reduce(
    (timeTally, [songId, playCount]) => {
      const songDetails = getSong(songId);
      const duration = songDetails ? songDetails.duration_seconds : 0;

      timeTally[songId] = playCount * duration;
      return timeTally;
    },
    {},
  );

  const mostListenedSongId = getHighestKey(mostListenedTallyTime);
  const mostListenedSong = getSong(mostListenedSongId);

  return {
    question: `Most listened song (time)`,
    answer: `${mostListenedSong.title} - ${mostListenedSong.artist}`,
  };
}

function mostListenedArtistCount(songs) {
  const enrichedSongs = addData(songs, "artist");
  const mostListenedTally = tallyData(enrichedSongs, "artist");
  const mostListenedArtist = getHighestKey(mostListenedTally);

  return {
    question: `Most listened artist (count)`,
    answer: `${mostListenedArtist}`,
  };
}

function mostListenedArtistTime(songs) {
  const enrichedSongs = addData(songs, "artist");

  const artistTimeTally = enrichedSongs.reduce((timeTally, event) => {
    const songDetails = getSong(event.song_id);
    const duration = songDetails ? songDetails.duration_seconds : 0;

    timeTally[event.artist] = (timeTally[event.artist] || 0) + duration;
    return timeTally;
  }, {});

  const mostListenedArtist = getHighestKey(artistTimeTally);

  return {
    question: `Most listened artist (time)`,
    answer: `${mostListenedArtist}`,
  };
}

function mostListenedFridaySongCount(songs) {
  const mostListenedTally = tallyData(songs, "song_id");
  const mostListenedSongId = getHighestKey(mostListenedTally);
  const mostListenedSong = getSong(mostListenedSongId);

  return {
    question: `Friday night song (count)`,
    answer: `${mostListenedSong.title} - ${mostListenedSong.artist}`,
  };
}

function mostListenedFridaySongTime(songs) {
  const mostListenedTally = tallyData(songs, "song_id");

  const mostListenedTallyTime = Object.entries(mostListenedTally).reduce(
    (timeTally, [songId, playCount]) => {
      const songDetails = getSong(songId);
      const duration = songDetails ? songDetails.duration_seconds : 0;

      timeTally[songId] = playCount * duration;
      return timeTally;
    },
    {},
  );

  const mostListenedSongId = getHighestKey(mostListenedTallyTime);
  const mostListenedSong = getSong(mostListenedSongId);

  return {
    question: `Friday night song (time)`,
    answer: `${mostListenedSong.title} - ${mostListenedSong.artist}`,
  };
}

function longestStreakSong(songs) {
  let bestSongId = songs[0].song_id;
  let bestCount = 1;
  let currentSongId = songs[0].song_id;
  let currentCount = 1;

  for (let i = 1; i < songs.length; i++) {
    if (songs[i].song_id === currentSongId) {
      currentCount++;
      if (currentCount > bestCount) {
        bestCount = currentCount;
        bestSongId = currentSongId;
      }
    } else {
      currentSongId = songs[i].song_id;
      currentCount = 1;
    }
  }

  const bestSong = getSong(bestSongId);

  return {
    question: "Longest streak song",
    answer: `${bestSong.title} - ${bestSong.artist} (${bestCount} times)`,
  };
}

// ======================================================
// ----- Page Loader
// ======================================================
window.onload = setup;
