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
  
  return (
    <div className="card">
      <img src={imageUrl} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <Link to={`/recipe/${encodeURIComponent(name)}`} className="btn btn-primary">
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipesPage;
