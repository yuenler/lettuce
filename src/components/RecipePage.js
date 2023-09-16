import react from 'react';
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



const RecipePage = ({ match }) => {
  const recipeName = decodeURIComponent(match.params.name);
  const recipe = recipes.find((r) => r.name === recipeName);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="recipe-page">
      <h2>{recipe.name}</h2>
      <div className="recipe-details">
        <div className="recipe-image">
          <img src={recipe.imageUrl} alt={recipe.name} />
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
      <Link to="/" className="btn btn-primary">
        Back to Recipes
      </Link>
    </div>
  );
};

export default RecipePage;
