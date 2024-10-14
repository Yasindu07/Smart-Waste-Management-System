// src/components/SpecialCollection.js
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
  LinearProgress,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig"; // Adjust the path as necessary

const SpecialCollection = () => {
  const [wasteType, setWasteType] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [emergencyCollection, setEmergencyCollection] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let downloadURL = null;

    // Check for image upload
    if (imageFile) {
      const storageRef = ref(storage, `special-collections/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      try {
        // Wait for the upload to complete
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(prog);
            },
            (error) => {
              console.error("Image upload error: ", error);
              setErrorMessage("Image upload failed.");
              reject(error);
            },
            async () => {
              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      } catch (error) {
        console.error("Error during image upload: ", error);
        return; // Early exit if there's an error
      }
    }

    // Prepare form data
    const formData = {
      wasteType,
      chooseDate: date,
      wasteDescription: description,
      emergencyCollection,
      wasteImage: downloadURL || null,
    };

    // Submit form data to backend
    await saveSpecialCollection(formData);
  };

  // Axios call to save data
  const saveSpecialCollection = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5002/api/specialCollection/add",
        formData
      );
      console.log("Data saved successfully: ", response.data);
      // Reset the form fields
      setWasteType("");
      setDate("");
      setDescription("");
      setEmergencyCollection("");
      setImage(null);
      setImageFile(null);
      setProgress(0);
      setErrorMessage(""); // Reset error message after successful submission
    } catch (error) {
      console.error("Error saving data: ", error);
      setErrorMessage("Failed to save data. Please try again.");
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a preview of the image
      setImageFile(file);
    }
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
        "@media (min-width: 768px)": {
          maxWidth: 600,
        },
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
          <MenuItem value="Electronic">Electronic</MenuItem>
          <MenuItem value="Hazardous">Hazardous</MenuItem>
        </Select>
      </FormControl>

      {/* Upload Image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px dashed gray",
          width: 150,
          height: 150,
          cursor: "pointer",
          margin: "0 auto", // Centers the image uploader
          overflow: "hidden", // Ensures content inside is cropped if larger
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
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Ensures the image fits the container
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

      {/* Progress Bar */}
      {progress > 0 && <LinearProgress variant="determinate" value={progress} />}

      {/* Error Message */}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

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
