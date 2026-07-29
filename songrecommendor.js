// ============================================================
// SONG RECOMMENDER — hackathon prototype
// Moods used: happy, sad, calm, energetic, neutral
// ============================================================

// ---------- 1. SAMPLE SONG LIST (JSON-style data) ----------
// EDIT ME: add/remove songs here. Each song just needs a mood tag
// that matches one of the 5 moods above.

const SONGS = [
  { title: "Walking on Sunshine", artist: "Katrina & The Waves", mood: "happy" },
  { title: "Good as Hell", artist: "Lizzo", mood: "happy" },
  { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", mood: "happy" },

  { title: "Someone Like You", artist: "Adele", mood: "sad" },
  { title: "Fix You", artist: "Coldplay", mood: "sad" },
  { title: "Skinny Love", artist: "Bon Iver", mood: "sad" },

  { title: "Weightless", artist: "Marconi Union", mood: "calm" },
  { title: "Sunday Morning", artist: "Maroon 5", mood: "calm" },
  { title: "Holocene", artist: "Bon Iver", mood: "calm" },

  { title: "Stronger", artist: "Kanye West", mood: "energetic" },
  { title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", mood: "energetic" },
  { title: "Levitating", artist: "Dua Lipa", mood: "energetic" },

  { title: "Intro", artist: "The xx", mood: "neutral" },
  { title: "Breathe", artist: "Telepopmusik", mood: "neutral" },
  { title: "Porcelain", artist: "Moby", mood: "neutral" }
];

// ---------- 2. MOOD → SONGS MAPPING ----------
// Simple lookup: build it once from SONGS above, so you never have
// to manually keep two lists in sync.

const MOOD_MAP = {
  happy: SONGS.filter(song => song.mood === "happy"),
  sad: SONGS.filter(song => song.mood === "sad"),
  calm: SONGS.filter(song => song.mood === "calm"),
  energetic: SONGS.filter(song => song.mood === "energetic"),
  neutral: SONGS.filter(song => song.mood === "neutral")
};

// ---------- 3. FUNCTION: get 3 songs for a mood ----------

function getSongsForMood(mood, count = 3) {
  const matches = MOOD_MAP[mood];

  // Fallback: unknown mood or no songs tagged for it -> use neutral
  if (!matches || matches.length === 0) {
    console.warn(`No songs found for mood "${mood}", falling back to neutral`);
    return MOOD_MAP.neutral.slice(0, count);
  }

  return matches.slice(0, count);
}

// ---------- Example usage ----------
// getSongsForMood("happy");
// -> [
//      { title: "Walking on Sunshine", artist: "Katrina & The Waves", mood: "happy" },
//      { title: "Good as Hell", artist: "Lizzo", mood: "happy" },
//      { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", mood: "happy" }
//    ]

export { SONGS, MOOD_MAP, getSongsForMood };