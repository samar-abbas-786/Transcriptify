import express from "express";
import cors from "cors";
import Transcript from "youtube-transcript-api";

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

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
