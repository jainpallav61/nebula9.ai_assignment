import React, { useState } from "react";
import { generateContent } from "../../services/api";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import ReactMarkdown from "react-markdown";

function GenerateContent() {
  const [keywords, setKeywords] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await generateContent(keywords.split(",").map((keyword) => keyword.trim()));
      setGeneratedContent(response.data.content);
    } catch (error) {
      console.error("Generate content error:", error);
      alert("Failed to generate content!");
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" mb={2}>Generate Content</Typography>
      <form onSubmit={handleSubmit}>
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
          <Typography><ReactMarkdown>{generatedContent}</ReactMarkdown></Typography>
        </Paper>
      )}
    </Box>
  );
}

export default GenerateContent;
