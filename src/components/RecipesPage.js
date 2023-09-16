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
      "1 tablespoon sesame oil",
      "1-inch piece of fresh ginger, minced",
      "2-3 cloves garlic, minced",
      "1-2 teaspoons sugar (optional, to balance the flavors)",
      "Salt and pepper to taste",
      "8 oz (about 2 portions) ramen noodles (fresh or dried)",
      "Sliced green onions (scallions)",
      "Sliced mushrooms (shiitake, cremini, or your choice)",
      "Corn kernels (canned or frozen, cooked)",
      "Sliced bamboo shoots (optional)",
      "Bean sprouts (optional)",
      "Soft-boiled eggs, halved or marinated egg (optional)",
      "Nori (seaweed) sheets, cut into thin strips (optional)",
      "Sesame seeds (optional)"
    ],
    recipe: `Instructions:

    1. Prepare the Broth:
       In a large pot, heat the sesame oil over medium heat. Add the minced ginger and garlic and sauté for about a minute until fragrant.
       Pour in the chicken or vegetable broth and bring it to a simmer.
       In a separate bowl, dissolve the miso paste in a small amount of hot broth, then add it back to the pot. Stir well to combine.
       Add soy sauce and sugar (if using) to the broth. Taste and adjust the seasoning, adding more miso or soy sauce as needed.
       Let the broth simmer on low heat while you prepare the noodles and toppings.
    
    2. Cook the Noodles:
       Bring a large pot of water to a boil and cook the ramen noodles according to the package instructions (usually around 2-3 minutes for fresh noodles and 4-5 minutes for dried noodles).
       Drain the noodles and rinse them under cold water to stop the cooking process. Set aside.
    
    3. Prepare Toppings:
       While the noodles are cooking, sauté the sliced mushrooms in a pan with a bit of oil until they are tender and slightly browned.
       Prepare any other toppings you like, such as soft-boiled eggs (cooked to your desired level of runniness), sliced green onions, corn kernels, bean sprouts, and bamboo shoots.
    
    4. Assemble the Ramen:
       Divide the cooked noodles between serving bowls.
       Ladle the hot miso broth over the noodles.
       Arrange the sautéed mushrooms and other toppings on top of the broth.
       Sprinkle with sliced green onions, sesame seeds, and nori strips if desired.
    
    5. Serve:
       Serve your homemade miso ramen hot, with chopsticks and a spoon for slurping up the delicious broth.
    
    Feel free to adjust the ingredients and toppings to suit your taste. Miso ramen is versatile, so you can get creative with your additions. Enjoy your homemade bowl of miso ramen!
    
    `,
  },
  {
    name: 'Chicken Tikka Masala',
    description: 'A flavorful Indian dish made with tender chicken in a rich masala sauce.',
    imageUrl: 'https://www.thecookingcollective.com.au/wp-content/uploads/2021/08/finished-tikka-masala-with-vegetables-and-roti-bread.jpg',
    ingredients: [
      "3 boneless, skinless chicken breasts",
      "½ cup plain yogurt",
      "2 tablespoons lemon juice",
      "6 cloves garlic, minced",
      "1 tablespoon minced ginger",
      "2 teaspoons salt",
      "2 teaspoons ground cumin",
      "2 teaspoons garam masala",
      "2 teaspoons paprika",
      "3 tablespoons oil",
      "1 large onion, finely chopped",
      "2 tablespoons minced ginger",
      "8 cloves garlic, minced",
      "2 teaspoons ground cumin",
      "2 teaspoons ground turmeric",
      "2 teaspoons ground coriander",
      "2 teaspoons paprika",
      "2 teaspoons chili powder",
      "2 teaspoons garam masala",
      "1 tablespoon tomato puree",
      "3 ½ cups tomato sauce",
      "1 ¼ cups water",
      "1 cup heavy cream",
      "¼ cup fresh cilantro, for garnish",
      "Cooked rice, for serving",
      "Naan bread, for serving"
    ],
    recipe: `Marinating the Chicken:

    1. In a large bowl, combine the yogurt, lemon juice, vegetable oil, ginger-garlic paste, cumin, coriander, turmeric, paprika, garam masala, and salt.
    
    2. Add the chicken pieces to the marinade, ensuring they are well coated. Cover the bowl with plastic wrap and refrigerate for at least 2 hours, or ideally overnight, to allow the flavors to meld.
    
    Cooking the Chicken:
    
    3. Preheat your grill, oven, or stovetop grill pan to medium-high heat. If using the grill, skewer the marinated chicken pieces for easy grilling.
    
    4. Cook the chicken until it's nicely charred and fully cooked, about 8-10 minutes per side. If using the oven, you can broil the chicken for about 10-12 minutes, flipping halfway through, or until it's cooked through.
    
    5. Remove the cooked chicken from the grill or oven and set it aside while you prepare the sauce.
    
    Preparing the Sauce:
    
    6. In a large, deep skillet or saucepan, heat the vegetable oil or ghee over medium heat.
    
    7. Add the chopped onions and sauté until they become translucent and start to turn golden brown, usually for about 5-7 minutes.
    
    8. Stir in the ginger-garlic paste and cook for another 1-2 minutes until the raw smell disappears.
    
    9. Add the ground cumin, ground coriander, paprika or chili powder, garam masala, salt, and black pepper. Stir well and cook for another 1-2 minutes to toast the spices.
    
    10. Pour in the crushed tomatoes and simmer the sauce for 10-15 minutes, allowing it to thicken and the flavors to meld.
    
    11. Reduce the heat to low and stir in the heavy cream or coconut milk. Simmer for an additional 5 minutes, stirring occasionally.
    
    12. Add the cooked chicken pieces to the sauce and simmer for an additional 5 minutes, allowing the chicken to absorb the flavors of the sauce.
    
    13. Taste and adjust the seasoning if necessary.
    
    14. Garnish with fresh cilantro leaves if desired.
    
    Serve your homemade Chicken Tikka Masala hot with steamed rice, naan bread, or roti. Enjoy your delicious homemade meal!
    `,
  },
  {
    name: 'Vegetarian Pizza',
    description: 'Delicious pizza topped with fresh vegetables and melted cheese.',
    imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2023/02/vegetarian-pizza.jpg',
    ingredients: [
      "Pizza dough (store-bought or homemade)",
      "Flour for dusting (if rolling out dough)",
      "1 cup tomato sauce or pizza sauce",
      "1 teaspoon olive oil",
      "1 clove garlic, minced (optional)",
      "1/2 teaspoon dried oregano",
      "Salt and pepper to taste",
      "1 1/2 cups shredded mozzarella cheese (or a mix of your favorite cheeses)",
      "Sliced bell peppers",
      "Sliced red onion",
      "Sliced black olives",
      "Sliced mushrooms",
      "Sliced tomatoes",
      "Fresh basil leaves",
      "Spinach leaves",
      "Artichoke hearts (canned or marinated)",
      "Crumbled feta cheese",
      "Red pepper flakes (for a bit of heat, optional)"
    ],
    recipe: `1. Preheat Your Oven:
    Preheat your oven to the highest temperature it can go (usually around 475-500°F or 245-260°C). If you have a pizza stone, place it in the oven while it preheats.
 
 2. Prepare the Pizza Dough:
    If using store-bought dough, follow the package instructions for bringing it to room temperature and rolling it out. If making homemade dough, roll it out on a floured surface to your desired thickness.
 
 3. Prepare the Pizza Sauce:
    In a small saucepan, heat the olive oil over medium heat. Add the minced garlic and sauté for about 30 seconds until fragrant.
    Pour in the tomato sauce and add dried oregano, salt, and pepper. Simmer for a few minutes until the sauce thickens slightly.
 
 4. Assemble the Pizza:
    Transfer the rolled-out pizza dough to a pizza stone, pizza pan, or baking sheet lined with parchment paper.
    Spread the tomato sauce evenly over the dough, leaving a small border around the edges for the crust.
    Sprinkle the shredded mozzarella cheese evenly over the sauce.
 
 5. Add the Vegetarian Toppings:
    Arrange your preferred vegetable toppings on the pizza. Be creative with your combinations and spread them evenly.
 
 6. Bake the Pizza:
    Place the pizza in the preheated oven and bake for 10-15 minutes or until the crust is golden and the cheese is bubbly and slightly browned.
 
 7. Finish and Serve:
    Remove the pizza from the oven and let it cool for a minute or two.
    Garnish with fresh basil leaves, crumbled feta cheese, and red pepper flakes if desired.
    Slice the vegetarian pizza and serve hot.
 `,
  },
];



const RecipesPage = () => {
  return (
    <div className="row" style={{
      backgroundColor: '#e7f0e4', height: '100vh',
    }}>
      {
        recipes.map((recipe, index) => (
          <div className="col-md-4" key={index}>
            <RecipeCard
              name={recipe.name}
              description={recipe.description}
              imageUrl={recipe.imageUrl}
            />
          </div>
        ))
      }
    </div >
  );
};

const RecipeCard = ({ name, description, imageUrl }) => {

  const [showRecipe, setShowRecipe] = useState(false);
  const [recipe, setRecipe] = useState(recipes[0]);

  return (
    <div className="card mt-5">
      {!showRecipe ?
        <div>
          <img src={imageUrl} className="card-img-top" alt={name} />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <button
              style={{ backgroundColor: '#526446' }}
              onClick={() => {
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
                <p>{recipe.recipe.split('\n').map(text => (
                  <p>{text}</p>
                ))}</p>
              </div>
            </div>

          </div>
          <button onClick={() => setShowRecipe(!showRecipe)} variant="primary" style={{ backgroundColor: '#526446' }}
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
