import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:8001';

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    yolo_food: string;
    gpt_food: string;
    final_food: string;
    calories: string;
  } | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${BACKEND_URL}/analyze-food`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err: any) {
      console.error('Error details:', err);
      setError(err.response?.data?.detail || 'Error analyzing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-orange-500 file:text-white
            hover:file:bg-orange-600"
        />
      </div>

      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className={`w-full py-2 px-4 rounded-lg text-white font-semibold
          ${!selectedFile || loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600'
          }`}
      >
        {loading ? 'Analyzing...' : 'Analyze Food'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Analysis Results:</h3>
          <p><strong>YOLO Detection:</strong> {result.yolo_food}</p>
          <p><strong>GPT Vision:</strong> {result.gpt_food}</p>
          <p><strong>Final Food:</strong> {result.final_food}</p>
          <p><strong>Calories:</strong> {result.calories}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 