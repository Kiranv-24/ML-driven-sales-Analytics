import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Paper, Grid } from '@mui/material';

const AnalysisResultsPage = () => {
  const location = useLocation();
  const { 
    salesForecast,
    stockoutPrediction,
    demandAnalysis 
  } = location.state;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Analysis Results</Typography>
      
      <Grid container spacing={3}>
        {/* Sales Forecast Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Sales Forecast</Typography>
            <Box>
              {salesForecast?.map((forecast, index) => (
                <Typography key={index}>
                  Date: {new Date(forecast.date).toLocaleDateString()} - 
                  Predicted Sales: {forecast.predicted_sales.toFixed(2)}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Stockout Prediction Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Stockout Prediction</Typography>
            <Typography>
              Average Daily Sales: {stockoutPrediction?.avgDailySales?.toFixed(2)}
            </Typography>
            <Typography>
              Days until stockout: {stockoutPrediction?.stockoutDays?.toFixed(2)}
            </Typography>
            <Typography color={stockoutPrediction?.warning ? "error" : "success"}>
              {stockoutPrediction?.message}
            </Typography>
          </Paper>
        </Grid>

        {/* Demand Analysis Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Demand Analysis</Typography>
            <Typography>
              Average Sales: {demandAnalysis?.avgSales?.toFixed(2)}
            </Typography>
            <Typography>
              Maximum Sales: {demandAnalysis?.maxSales}
            </Typography>
            <Typography>
              Minimum Sales: {demandAnalysis?.minSales}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalysisResultsPage;
