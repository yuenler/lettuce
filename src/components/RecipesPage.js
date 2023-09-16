import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const recipes = [
  {
    name: 'Miso Ramen',
    description: 'A classic Japanese noodle soup with savory miso broth.',
    imageUrl: 'https://dishingouthealth.com/wp-content/uploads/2022/01/SpicyMisoRamen_Square.jpg',
    ingredients: [
      "4 cups chicken or vegetable broth",
      "2-4 tablespoons miso paste (adjust to taste, white or red miso works)",
      "1-2 tablespoons soy sauce (adjust to taste)",
      // Add more ingredients here
    ],
    recipe: `1. **Prepare the Broth:**
    // Add recipe steps here
    `,
  },
  {
    name: 'Chicken Tikka Masala',
    description: 'A flavorful Indian dish made with tender chicken in a rich masala sauce.',
    imageUrl: 'https://www.thecookingcollective.com.au/wp-content/uploads/2021/08/finished-tikka-masala-with-vegetables-and-roti-bread.jpg',
    ingredients: [
      // Add ingredients for Chicken Tikka Masala
    ],
    recipe: `// Add recipe steps for Chicken Tikka Masala here`,
  },
  {
    name: 'Vegetarian Pizza',
    description: 'Delicious pizza topped with fresh vegetables and melted cheese.',
    imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/02/vegetarian-pizza.jpg',
    ingredients: [
      // Add ingredients for Vegetarian Pizza
    ],
    recipe: `// Add recipe steps for Vegetarian Pizza here`,
  },
];



const RecipesPage = () => {
  return (
    <div className="row">
      {recipes.map((recipe, index) => (
        <div className="col-md-4" key={index}>
          <RecipeCard
            name={recipe.name}
            description={recipe.description}
            imageUrl={recipe.imageUrl}
          />
        </div>
      ))}
    </div>
  );
};

const RecipeCard = ({ name, description, imageUrl }) => {

  const [showRecipe, setShowRecipe] = useState(false);
  const [recipe, setRecipe] = useState(recipes[0]);

  return (
    <div className="card">
      {!showRecipe ?
        <div>
          <img src={imageUrl} className="card-img-top" alt={name} />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <button onClick={() => {
              setShowRecipe(!showRecipe);
              setRecipe(recipes.find((recipe) => recipe.name === name));
            }} variant="primary"
              className='btn btn-primary'
            >
              View Recipe
            </button>
          </div>
        </div>
        : <div className="card-body">
          <div className="recipe-page">
            <h2>{recipe.name}</h2>
            <div className="recipe-details">
              <div className="recipe-image">
                <img className="card-img-top" src={recipe.imageUrl} alt={recipe.name} />
              </div>
              <div className="recipe-content">
                <h3>Ingredients</h3>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h3>Recipe</h3>
                <p>{recipe.recipe}</p>
              </div>
            </div>

          </div>
          <button onClick={() => setShowRecipe(!showRecipe)} variant="primary"
            className='btn btn-primary'
          >
            Done
          </button>
        </div>
      }
    </div>
  );
};

export default RecipesPage;
