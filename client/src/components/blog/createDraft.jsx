import React, { useState } from "react";
import { saveDraft } from "../../services/api";
import { TextField, Button, Box, Typography } from "@mui/material";

function CreateDraft() {
  const [draftData, setDraftData] = useState({ title: "", content: "", keywords: "" });

  const handleChange = (e) => {
    setDraftData({ ...draftData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveDraft(draftData);
      alert("Draft saved!");
    } catch (error) {
      console.error("Save draft error:", error);
      alert("Failed to save draft!");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" mb={2}>Create a New Draft</Typography>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={draftData.title}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Content"
        name="content"
        value={draftData.content}
        onChange={handleChange}
        multiline
        rows={4}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Keywords (comma separated)"
        name="keywords"
        value={draftData.keywords}
        onChange={handleChange}
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit">
        Save Draft
      </Button>
    </Box>
  );
}

export default CreateDraft;
