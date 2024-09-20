// import React, { useState } from "react";
// import { saveDraft } from "../../services/api";
// import { TextField, Button, Box, Typography } from "@mui/material";

// function CreateDraft() {
//   const [draftData, setDraftData] = useState({ title: "", content: "", keywords: "" });

//   const handleChange = (e) => {
//     setDraftData({ ...draftData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await saveDraft(draftData);
//       alert("Draft saved!");
//     } catch (error) {
//       console.error("Save draft error:", error);
//       alert("Failed to save draft!");
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//       <Typography variant="h5" mb={2}>Create a New Draft</Typography>
//       <TextField
//         fullWidth
//         label="Title"
//         name="title"
//         value={draftData.title}
//         onChange={handleChange}
//         required
//         margin="normal"
//       />
//       <TextField
//         fullWidth
//         label="Content"
//         name="content"
//         value={draftData.content}
//         onChange={handleChange}
//         multiline
//         rows={4}
//         required
//         margin="normal"
//       />
//       <TextField
//         fullWidth
//         label="Keywords (comma separated)"
//         name="keywords"
//         value={draftData.keywords}
//         onChange={handleChange}
//         margin="normal"
//       />
//       <Button variant="contained" color="primary" type="submit">
//         Save Draft
//       </Button>

//     </Box>
//   );
// }

// export default CreateDraft;

import React, { useState } from "react";
import { saveDraft, postContent } from "../../services/api";
import { TextField, Button, Box, Typography } from "@mui/material";

function CreateDraft() {
  const [status, setStatus] = useState("idle");
  const [draftData, setDraftData] = useState({
    title: "",
    content: "",
    keywords: "",
  });

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

  const handlePublishToMedium = async () => {
    if (!draftData.content) {
      alert("No content to publish!");
      return;
    }

    setStatus("publishing");

    // const userId = await getUserId();
    // console.log(`this is useID: ${userId}`);

    const postData = {
      title: draftData.title || "Untitled Blog",
      contentFormat: "html",
      content: `<p>${draftData.content}</p>`,
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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" mb={2}>
        Create a New Draft
      </Typography>
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
      <Button
        variant="contained"
        color="secondary"
        sx={{ ml: 2 }}
        onClick={handlePublishToMedium}
        disabled={status === "publishing"}
      >
        {status === "publishing" ? "Publishing..." : "Publish to Medium"}
      </Button>
    </Box>
  );
}

export default CreateDraft;
