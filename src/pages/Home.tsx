import React, { useState, useEffect } from 'react';

interface AnalysisResult {
  foods: string[];
  calories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fats: number;
  };
  portion_size: number;
  confidence: number;
  yolo_detections: Array<{
    class: string;
    confidence: number;
    bbox: number[];
    estimated_portion: number;
  }>;
}

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (selectedImage) {
      analyzeImage(selectedImage);
    }
    // eslint-disable-next-line
  }, [selectedImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
      setAnalysis(null);
    }
  };

  const analyzeImage = async (image: File) => {
    setIsLoading(true);
    setError('');
    setAnalysis(null);
    const formData = new FormData();
    formData.append('file', image);
    try {
      const response = await fetch('http://localhost:8000/analyze-food', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>NutriAI</h1>
          <p>Upload a food image to analyze its nutritional content</p>
          <div className="upload-section">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="upload-button">
              Choose Image
            </label>
            {previewUrl && (
              <div className="preview-container">
                <img src={previewUrl} alt="Preview" className="image-preview" />
              </div>
            )}
            {isLoading && <div className="loading-message">Analyzing image...</div>}
            {error && <div className="error-message">{error}</div>}
            {analysis && (
              <div className="dashboard-results">
                <h2>Nutrition Dashboard</h2>
                <div className="dashboard-grid">
                  <div className="dashboard-card">
                    <h3>Calories</h3>
                    <p>{analysis.calories} kcal</p>
                  </div>
                  <div className="dashboard-card">
                    <h3>Protein</h3>
                    <p>{analysis.macronutrients?.protein} g</p>
                  </div>
                  <div className="dashboard-card">
                    <h3>Fat</h3>
                    <p>{analysis.macronutrients?.fats} g</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 