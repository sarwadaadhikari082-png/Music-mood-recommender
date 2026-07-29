import { detectMoodFromText, detectMoodFromSelfie } from './mooddetection.js';
import { getSongsForMood } from './songrecommender.js';

async function handleTextSubmit(text) {
  const mood = await detectMoodFromText(text);      // step 1: detect
  const songs = getSongsForMood(mood, 3);           // step 2: recommend
  renderSongs(mood, songs);                         // step 3: display
}

async function handleSelfieSubmit(imageFile) {
  const mood = await detectMoodFromSelfie(imageFile);
  const songs = getSongsForMood(mood, 3);
  renderSongs(mood, songs);
}

function renderSongs(mood, songs) {
  // reuse the same card-rendering logic already in moodmix.html
  console.log(`Mood detected: ${mood}`, songs);
}