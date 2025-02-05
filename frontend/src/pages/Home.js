import React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";

const Home = () => {
  return (
    <Box>
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={4}>
          {/* Hero Section */}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 6,
                textAlign: "center",
                background: "linear-gradient(45deg, #E2E0C8 30%, #A7B49E 90%)",
                color: "white",
              }}
            >
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{
                  fontFamily: '"Lugrasimo", serif',
                  fontWeight: 400,
                  fontStyle: "normal"
                }}
              >
                Welcome to TechMart System
              </Typography>
              <Typography 
                variant="h6" 
                paragraph
                sx={{
                  fontFamily: '"Lugrasimo", serif',
                  fontSize: "1.8rem",
                  fontWeight: 400,
                  fontStyle: "normal"
                }}
              >
                Join us to share and analyze product feedback
              </Typography>
            </Paper>
          </Grid>

          {/* Features Section */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: "100%",
              background: "linear-gradient(45deg, #E2E0C8 30%, #A7B49E 90%)"
             }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  fontFamily: '"Lugrasimo", serif',
                  fontWeight: 400,
                  fontStyle: "normal"
                }}
              >
                Product Reviews
              </Typography>
              <Typography
              sx={{
                fontFamily: '"Lugrasimo", serif',
                fontWeight: 400,
                fontStyle: "normal"
              }}>
                Share your experience with products and help others make
                informed decisions.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: "100%",background: "linear-gradient(45deg, #E2E0C8 30%, #A7B49E 90%)" }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  fontFamily: '"Lugrasimo", serif',
                  fontWeight: 400,
                  fontStyle: "normal"
                }}
              >
                Sentiment Analysis
              </Typography>
              <Typography
              sx={{
                fontFamily: '"Lugrasimo", serif',
                fontWeight: 400,
                fontStyle: "normal"
              }}>
                Advanced analytics to understand customer sentiment and feedback
                patterns.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: "100%",background: "linear-gradient(45deg, #E2E0C8 30%, #A7B49E 90%)" }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{
                  fontFamily: '"Lugrasimo", serif',
                  fontWeight: 400,
                  fontStyle: "normal"
                }}
              >
                Improvement Insights
              </Typography>
              <Typography
              sx={{
                fontFamily: '"Lugrasimo", serif',
                fontWeight: 400,
                fontStyle: "normal"
              }}>
                Get actionable insights to improve products based on customer
                feedback.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
