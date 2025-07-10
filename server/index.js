import express from "express";
import cors from "cors";
import Transcript from "youtube-transcript-api";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

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
    const result = await ai.models.generateContent({
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

    // const response = await result.response;
    let text = result.text;
    text = text
      .trim()
      .replace(/^```json\n?/, "")
      .replace(/```$/, "");

    const summary = JSON.parse(text);
    // console.log("result", summary);

    return res.status(200).json({ summary });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "Error in getting summary", error });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
