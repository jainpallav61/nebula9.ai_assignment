import React, { useState, useEffect } from "react";
import { getDrafts } from "../../services/api";
import { Grid, Paper, Typography, Box } from "@mui/material";

function ViewDrafts() {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await getDrafts();
        setDrafts(response.data);
      } catch (error) {
        console.error("Fetch drafts error:", error);
      }
    };
    fetchDrafts();
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" mb={2}>Your Drafts</Typography>
      <Grid container spacing={3}>
        {drafts.map((draft) => (
          <Grid item xs={12} sm={6} md={4} key={draft._id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">{draft.title}</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {draft.content}
              </Typography>
              <Typography variant="subtitle2">
                <strong>Keywords:</strong> {draft.keywords.join(", ")}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ViewDrafts;
