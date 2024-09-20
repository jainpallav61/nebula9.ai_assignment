import React, { useState } from "react";
import { generateContent, postContent, saveDraft } from "../../services/api";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const GenerateContent = () => {
  const [keywords, setKeywords] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [status, setStatus] = useState("idle");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await generateContent(
        keywords.split(",").map((keyword) => keyword.trim())
      );
      setGeneratedContent(response.data.content);
    } catch (error) {
      console.error("Generate content error:", error);
      alert("Failed to generate content!");
    }
  };

  const handleSaveDraft = async () => {
    if (!title || !generatedContent) {
      alert("Title and content are required!");
      return;
    }

    try {
      await saveDraft({ title, content: generatedContent, keywords });
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Save draft error:", error);
      alert("Failed to save draft!");
    }
  };

  const handlePublishToMedium = async () => {
    if (!generatedContent) {
      alert("No content to publish!");
      return;
    }

    setStatus("publishing");

    // const userId = await getUserId();
    // console.log(`this is useID: ${userId}`);

    const postData = {
      title: title || "Untitled Blog",
      contentFormat: "html",
      content: `<p>${generatedContent}</p>`,
      publishStatus: "draft",
      userId:
        "1c89d2bf47811ab4ff7b53ef6102ae19a1f046a79a6646cd13178305833243deb",
    };

    try {
      const response = await postContent(postData);
      console.log("Post published to Medium:", response.data);
      setStatus("published");
      alert("Content successfully published to Medium!");
    } catch (error) {
      console.error("Error publishing to Medium:", error.response);
      setStatus("error");
      alert("Failed to publish content to Medium.");
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" mb={2}>
        Generate Content
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Enter keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Generate Content
        </Button>
      </form>

      {generatedContent && (
        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6">Generated Content</Typography>
          <Typography>
            <ReactMarkdown>{generatedContent}</ReactMarkdown>
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={handlePublishToMedium}
            disabled={status === "publishing"}
          >
            {status === "publishing" ? "Publishing..." : "Publish to Medium"}
          </Button>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, ml: 2 }}
            onClick={handleSaveDraft}
          >
            Save Draft
          </Button>

          {status === "published" && (
            <Typography color="green">Published Successfully!</Typography>
          )}
        </Paper>
      )}
    </Box>
  );
}

export default GenerateContent;
