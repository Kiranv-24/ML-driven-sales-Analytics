import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Paper, Grid } from '@mui/material';

const AnalysisResultsPage = () => {
  const location = useLocation();
  const { 
    salesForecast,
    // stockoutPrediction,
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
                  Predicted Sales: {forecast.predicted_sales ? forecast.predicted_sales.toFixed(0) : 'N/A'}
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
              Average Daily Sales: {stockoutPrediction?.avgDailySales ? stockoutPrediction.avgDailySales.toFixed(0) : 'N/A'}
            </Typography>
            <Typography>
              Days until stockout: {stockoutPrediction?.stockoutDays ? stockoutPrediction.stockoutDays.toFixed(0) : 'N/A'}
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
              Average Sales: {demandAnalysis?.avgSales ? demandAnalysis.avgSales.toFixed(0) : 'N/A'}
            </Typography>
            <Typography>
              Maximum Sales: {demandAnalysis?.maxSales ? demandAnalysis.maxSales.toFixed(0) : 'N/A'}
            </Typography>
            <Typography>
              Minimum Sales: {demandAnalysis?.minSales ? demandAnalysis.minSales.toFixed(0) : 'N/A'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalysisResultsPage;
