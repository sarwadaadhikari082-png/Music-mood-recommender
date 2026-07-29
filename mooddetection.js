// ============================================================
// MOOD DETECTION — hackathon prototype
// Two entry points:
//   detectMoodFromText(text)   -> "positive" | "negative" | "neutral"
//   detectMoodFromSelfie(img)  -> "happy" | "sad" | "calm" | "angry" | "neutral"
// Both are wrapped with a safe fallback so the demo never crashes.
// ============================================================

// ---------- 1. TEXT SENTIMENT (real logic, no API needed) ----------

// EDIT ME: add/remove words to tune sensitivity
const POSITIVE_WORDS = [
  'happy', 'good', 'great', 'awesome', 'excited', 'love', 'amazing',
  'fantastic', 'glad', 'joy', 'fun', 'chill', 'relaxed', 'calm', 'grateful'
];
const NEGATIVE_WORDS = [
  'sad', 'bad', 'angry', 'tired', 'stressed', 'hate', 'upset',
  'anxious', 'awful', 'terrible', 'down', 'depressed', 'mad', 'frustrated'
];

function detectMoodFromText(text) {
  try {
    if (!text || typeof text !== 'string') throw new Error('empty text');

    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // strip punctuation
      .split(/\s+/);

    let posScore = 0;
    let negScore = 0;

    words.forEach(word => {
      if (POSITIVE_WORDS.includes(word)) posScore++;
      if (NEGATIVE_WORDS.includes(word)) negScore++;
    });

    if (posScore === 0 && negScore === 0) return 'neutral';
    return posScore > negScore ? 'positive'
         : negScore > posScore ? 'negative'
         : 'neutral';

  } catch (err) {
    console.warn('Text mood detection failed, using mock fallback:', err.message);
    return mockTextMood();
  }
}

// ---------- 2. SELFIE EMOTION (mocked by default) ----------

const SELFIE_EMOTIONS = ['happy', 'sad', 'calm', 'angry', 'neutral'];

// This is the function your UI should call. Swap the inside for a real
// model later — the function signature stays the same either way.
async function detectMoodFromSelfie(imageInputOrFile) {
  try {
    // ---- OPTION A: plug in a real model here later, e.g. face-api.js ----
    // const detections = await faceapi.detectSingleFace(imageInputOrFile)
    //   .withFaceExpressions();
    // if (!detections) throw new Error('no face detected');
    // return topExpression(detections.expressions); // map to your 5 labels

    // ---- OPTION B (default for hackathon): mock it ----
    if (!imageInputOrFile) throw new Error('no image provided');
    return mockSelfieMood();

  } catch (err) {
    console.warn('Selfie mood detection failed, using mock fallback:', err.message);
    return mockSelfieMood();
  }
}

// ---------- 3. MOCK HELPERS (used as fallback, or as the whole thing) ----------

function mockTextMood() {
  return pickRandom(['positive', 'negative', 'neutral']);
}

function mockSelfieMood() {
  return pickRandom(SELFIE_EMOTIONS);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================================
// DEMO-DAY CHEAT MODE (optional):
// If the mock feels too random on stage, force a specific result
// instead of a real random pick. Uncomment and set a fixed value:
//
// function mockSelfieMood() { return 'happy'; }
// function mockTextMood()   { return 'positive'; }
// ============================================================

// ---------- Example usage ----------
// detectMoodFromText("I'm feeling pretty stressed today").then(console.log);
// detectMoodFromSelfie(myImageFile).then(console.log);

export { detectMoodFromText, detectMoodFromSelfie };