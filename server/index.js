import express from "express";
import cors from "cors";
import Transcript from "youtube-transcript-api";
import { configDotenv } from "dotenv";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
configDotenv();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/getTranscript", async (req, res) => {
  const { videoId } = req.body;
  console.log("Extracted videoId:", videoId);

  let transcript = "";

  try {
    const data = await Transcript.getTranscript(videoId); // ✅ fix typo here
    data.forEach((d) => {
      transcript += d.text + " ";
    });

    if (data.length !== 0) {
      return res.status(200).json({ transcript: transcript.trim() });
    } else {
      return res.status(404).json({ error: "Transcript not found" });
    }
  } catch (error) {
    console.error("Error fetching transcript:", error.message);
    return res.status(500).json({ error: "Failed to fetch transcript" });
  }
});

app.post("/getSummary", async (req, res) => {
  const { transcript } = req.body;
  try {
    const data = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a highly intelligent assistant. I will provide you with a raw transcript of a conversation, meeting, or video. 

Your task is to:

1. Carefully read and understand the transcript.
2. Identify all the main **topics/headings** that were discussed.
3. For each topic/heading, extract and summarize the key points or subtopics mentioned under it.
4. Return the result in this strict JSON format:

[
  {
    "heading": "Topic Title",
    "points": [
      "First key point under this topic",
      "Second key point...",
      ...
    ]
  },
  ...
]

Ensure:
- No irrelevant filler text is included.
- Headings are concise and informative.
- Each heading groups the relevant conversation logically.

Here is the transcript:
${transcript}
`,
    });
    if (data) {
      return res.status(200).json({ message: "Got it", data });
    }
    return res.status(400).json({ message: "Summary not found" });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Error in getting summary", error });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
