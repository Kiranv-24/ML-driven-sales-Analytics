import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleReviewAnalysis = async () => {
    try {
      setLoading(true);

      // Fetch and analyze reviews in a single request
      const response = await fetch(
        `http://localhost:5001/analyze-product-reviews/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch analysis");
      }

      const analysisResult = await response.json();

      // Navigate to results page with the analysis data
      navigate("/analysis-results", { state: { analysis: analysisResult } });
    } catch (error) {
      console.error("Error analyzing reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductAnalysis = () => {
    navigate("/product-analysis", { state: { productId: id } });
  };

  const handleDemandAnalysis = () => {
    // Implement demand analysis logic here
    console.log("Demand analysis initiated for product ID:", id);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleReviewAnalysis}
          disabled={loading}
          sx={{
            margin: 1,
            backgroundColor: "primary.main",
            color: "common.white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Review Analysis"}
        </Button>
        <Button
          variant="contained"
          onClick={handleProductAnalysis}
          sx={{
            margin: 1,
            backgroundColor: "primary.main",
            color: "common.white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Product Analysis
        </Button>
        <Button
          variant="contained"
          onClick={handleDemandAnalysis}
          sx={{
            margin: 1,
            backgroundColor: "primary.main",
            color: "common.white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Demand Analysis
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
