import { useState } from 'react'
import './App.css'

// Ingredient Components
const TopBread = () => (
  <div className="ingredient top-bread" />
);

const BottomBread = () => (
  <div className="ingredient bottom-bread" />
);

const Lettuce = () => (
  <div className="ingredient lettuce" />
);

const Meat = () => (
  <div className="ingredient meat" />
);

const Tomato = () => (
  <div className="ingredient tomato" />
);

// Types
type Ingredient = 'lettuce' | 'meat' | 'tomato';

interface BurgerProps {
  ingredients: Ingredient[];
  onRemove: (index: number) => void;
}

// Burger Component
const Burger = ({ ingredients, onRemove }: BurgerProps) => {
  const renderIngredient = (type: Ingredient, index: number) => {
    const ingredientElement = (() => {
      switch (type) {
        case 'lettuce':
          return <Lettuce />;
        case 'meat':
          return <Meat />;
        case 'tomato':
          return <Tomato />;
        default:
          return null;
      }
    })();

    return (
      <div
        key={index}
        className="ingredient-wrapper"
        onClick={() => onRemove(index)}
        title="Click to remove"
        style={{ cursor: 'pointer' }}
      >
        {ingredientElement}
      </div>
    );
  };

  return (
    <div className="burger-container">
      <TopBread />
      {ingredients.map((ing, i) => renderIngredient(ing, i))}
      <BottomBread />
    </div>
  );
};


function App() {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const addIngredient = (ingredient: Ingredient) => {
  setIngredients([ingredient, ...ingredients]); // ✅ Now it's type-safe
};

  const removeIngredient = (index: number) => {
  setIngredients(prev => prev.filter((_, i) => i !== index));
};

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Build Your ACA Burger</h1>
      <div>
        <button className="btn-lettuce" onClick={() => addIngredient('lettuce')}>Add Lettuce</button>
        <button className="btn-meat" onClick={() => addIngredient('meat')}>Add Meat</button>
        <button className="btn-tomato" onClick={() => addIngredient('tomato')}>Add Tomato</button>
      </div>
      
      <div>
        <button className="btn-reset" onClick={() => setIngredients([])}>Reset</button>
      </div>

      <Burger ingredients={ingredients} onRemove={removeIngredient} />

      {/* Instructions Section */}
      <div className="instructions">
        <h2>How to Build Your ACA Burger</h2>
        <ul>
          <li>Click the colored buttons above to add ingredients to your burger.</li>
          <li>Click on any ingredient in the burger stack to remove it.</li>
          <li>Use the <strong>Reset</strong> button to clear your burger and start over.</li>
        </ul>
      </div>
    </div>
  );
}

export default App
