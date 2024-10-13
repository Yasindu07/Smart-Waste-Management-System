import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  IconButton,
} from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const SpecialCollection = () => {
  const [wasteType, setWasteType] = useState("");
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState("");
  const [emergencyCollection, setEmergencyCollection] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      wasteType,
      date,
      description,
      emergencyCollection,
      image,
    };
    console.log(formData);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
        '@media (min-width: 768px)': {
          maxWidth: 600, // Adjusts for larger screens
        }
      }}
    >
      {/* Select Waste Type */}
      <FormControl fullWidth>
        <InputLabel>Select waste type</InputLabel>
        <Select
          value={wasteType}
          onChange={(e) => setWasteType(e.target.value)}
          label="Select waste type"
          required
        >
          <MenuItem value="Organic">Organic</MenuItem>
          <MenuItem value="Plastic">Plastic</MenuItem>
          <MenuItem value="Metal">Metal</MenuItem>
          <MenuItem value="E-waste">E-waste</MenuItem>
        </Select>
      </FormControl>

      {/* Upload Image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px dashed gray",
          height: 150,
          width: 150,
          cursor: "pointer",
          margin: "0 auto", // Centers the image uploader
        }}
      >
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload">
          <IconButton component="span" sx={{ width: "100%", height: "100%" }}>
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: 4, // Rounded corners for better UI
                }}
              />
            ) : (
              <AddPhotoAlternateIcon sx={{ fontSize: 40 }} />
            )}
          </IconButton>
        </label>
      </Box>

      {/* Date Picker */}
      <TextField
        fullWidth
        label="Choose Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        required
      />

      {/* Waste Description */}
      <TextField
        label="Enter waste description"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* Emergency Collection */}
      <TextField
        label="In emergency waste collection"
        multiline
        rows={2}
        value={emergencyCollection}
        onChange={(e) => setEmergencyCollection(e.target.value)}
        required
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: "#28a745",
          color: "white",
          "&:hover": {
            backgroundColor: "#218838",
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SpecialCollection;
