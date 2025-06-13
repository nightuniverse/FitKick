import React from 'react';

interface NutritionInfo {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

interface AnalysisResult {
  ingredients: string[];
  nutrition: NutritionInfo;
  portionSize: string;
}

interface ResultsProps {
  analysis: AnalysisResult;
}

const Results: React.FC<ResultsProps> = ({ analysis }) => {
  return (
    <div className="results">
      <h3>Analysis Results</h3>
      
      <div className="nutrition-grid">
        <div className="nutrition-item">
          <h4>Calories</h4>
          <p>{analysis.nutrition.calories} kcal</p>
        </div>
        <div className="nutrition-item">
          <h4>Proteins</h4>
          <p>{analysis.nutrition.proteins}g</p>
        </div>
        <div className="nutrition-item">
          <h4>Fats</h4>
          <p>{analysis.nutrition.fats}g</p>
        </div>
        <div className="nutrition-item">
          <h4>Carbs</h4>
          <p>{analysis.nutrition.carbs}g</p>
        </div>
      </div>

      <div className="portion-info">
        <h4>Estimated Portion Size</h4>
        <p>{analysis.portionSize}</p>
      </div>

      <div className="ingredients">
        <h4>Ingredients</h4>
        <ul className="ingredients-list">
          {analysis.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Results; 