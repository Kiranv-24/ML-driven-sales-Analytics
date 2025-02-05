import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import documentsIcon from '../assets/icons/presentation.png';
import productIcon from '../assets/icons/visual.png';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleReviewAnalysis = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5001/analyze-product-reviews/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch analysis");
      const analysisResult = await response.json();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-900">
              Product Analysis Dashboard
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gain valuable insights into your product's performance through our
            comprehensive analysis tools
          </p>
        </div>

        {/* Analysis Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Review Analysis Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl duration-300">
            <div className="p-8 flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <img
              src={documentsIcon}
              alt="Review Analysis"
              className="h-8 w-8 object-contain"
            />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Review Analysis
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Analyze customer feedback and sentiment to understand user
                satisfaction.
              </p>
              <button
                onClick={handleReviewAnalysis}
                disabled={loading}
                className="w-full bg-[#5C7285] text-white py-3 px-6 rounded-xl font-semibold 
                  hover:bg-[#4A5B69] focus:ring-2 focus:ring-[#5C7285] focus:ring-offset-2 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  "Analyze Reviews"
                )}
              </button>
            </div>
          </div>

          {/* Product Analysis Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl duration-300">
            <div className="p-8 flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <img
                src={productIcon}
                alt="Review Analysis"
                className="h-8 w-8 object-contain"
            />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Product Analysis
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Get detailed insights into product performance<br></br> and
                metrics.
              </p>
              <button
                onClick={handleProductAnalysis}
                className="w-full bg-[#5C7285] text-white py-3 px-6 rounded-xl font-semibold 
                  hover:bg-[#4A5B69] focus:ring-2 focus:ring-[#5C7285] focus:ring-offset-2 
                  transition-all duration-300"
              >
                Analyze Product
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 
              className="text-2xl font-bold text-gray-900 mb-4"
             >
             Make Data-Driven Decisions
            </h2>
            <p className="text-gray-600"
            >
              Our advanced analytics tools help you understand your product's
              performance, customer satisfaction, and market demand through
              comprehensive analysis and intuitive visualizations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
