import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './RecipesPage.css'; // Create a CSS file for custom styles
import { Modal, Button } from 'react-bootstrap';


const recipes = [
  {
    name: 'Miso Ramen',
    description: 'A classic Japanese noodle soup with savory miso broth.',
    imageUrl: 'https://dishingouthealth.com/wp-content/uploads/2022/01/SpicyMisoRamen_Square.jpg',
    ingredients: [
      { "text": "4 cups chicken or vegetable broth", "ingredient": "chicken broth" },
      { "text": "2-4 tablespoons miso paste (adjust to taste, white or red miso works)", "ingredient": "miso paste" },
      { "text": "1-2 tablespoons soy sauce (adjust to taste)", "ingredient": "soy sauce" },
      { "text": "1 tablespoon sesame oil", "ingredient": "sesame oil" },
      { "text": "1-inch piece of fresh ginger, minced", "ingredient": "fresh ginger" },
      { "text": "2-3 cloves garlic, minced", "ingredient": "cloves garlic" },
      { "text": "1-2 teaspoons sugar (optional, to balance the flavors)", "ingredient": "sugar" },
      { "text": "Salt and pepper to taste", "ingredient": "Salt and pepper" },
      { "text": "8 oz (about 2 portions) ramen noodles (fresh or dried)", "ingredient": "ramen noodles" },
      { "text": "Sliced green onions (scallions)", "ingredient": "green onions" },
      { "text": "Sliced mushrooms (shiitake, cremini, or your choice)", "ingredient": "mushrooms" },
      { "text": "Corn kernels (canned or frozen, cooked)", "ingredient": "corn kernels" },
      { "text": "Sliced bamboo shoots (optional)", "ingredient": "bamboo shoots" },
      { "text": "Bean sprouts (optional)", "ingredient": "bean sprouts" },
      { "text": "Soft-boiled eggs, halved or marinated egg (optional)", "ingredient": "soft-boiled eggs" },
      { "text": "Nori (seaweed) sheets, cut into thin strips (optional)", "ingredient": "Nori sheets" },
      { "text": "Sesame seeds (optional)", "ingredient": "sesame seeds" }
    ]
    ,
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
      { "text": "3 boneless, skinless chicken breasts", "ingredient": "chicken breasts" },
      { "text": "½ cup plain yogurt", "ingredient": "plain yogurt" },
      { "text": "2 tablespoons lemon juice", "ingredient": "lemon juice" },
      { "text": "6 cloves garlic, minced", "ingredient": "garlic" },
      { "text": "1 tablespoon minced ginger", "ingredient": "ginger" },
      { "text": "2 teaspoons salt", "ingredient": "salt" },
      { "text": "2 teaspoons ground cumin", "ingredient": "ground cumin" },
      { "text": "2 teaspoons garam masala", "ingredient": "garam masala" },
      { "text": "2 teaspoons paprika", "ingredient": "paprika" },
      { "text": "3 tablespoons oil", "ingredient": "oil" },
      { "text": "1 large onion, finely chopped", "ingredient": "onion" },
      { "text": "2 tablespoons minced ginger", "ingredient": "ginger" },
      { "text": "8 cloves garlic, minced", "ingredient": "garlic" },
      { "text": "2 teaspoons ground cumin", "ingredient": "ground cumin" },
      { "text": "2 teaspoons ground turmeric", "ingredient": "ground turmeric" },
      { "text": "2 teaspoons ground coriander", "ingredient": "ground coriander" },
      { "text": "2 teaspoons paprika", "ingredient": "paprika" },
      { "text": "2 teaspoons chili powder", "ingredient": "chili powder" },
      { "text": "2 teaspoons garam masala", "ingredient": "garam masala" },
      { "text": "1 tablespoon tomato puree", "ingredient": "tomato puree" },
      { "text": "3 ½ cups tomato sauce", "ingredient": "tomato sauce" },
      { "text": "1 ¼ cups water", "ingredient": "water" },
      { "text": "1 cup heavy cream", "ingredient": "heavy cream" },
      { "text": "¼ cup fresh cilantro, for garnish", "ingredient": "fresh cilantro" },
      { "text": "Cooked rice, for serving", "ingredient": "Cooked rice" },
      { "text": "Naan bread, for serving", "ingredient": "Naan bread" }
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
      { "text": "Pizza dough (store-bought or homemade)", "ingredient": "Pizza dough" },
      { "text": "Flour for dusting (if rolling out dough)", "ingredient": "Flour" },
      { "text": "1 cup tomato sauce or pizza sauce", "ingredient": "tomato sauce or pizza sauce" },
      { "text": "1 teaspoon olive oil", "ingredient": "olive oil" },
      { "text": "1 clove garlic, minced (optional)", "ingredient": "garlic" },
      { "text": "1/2 teaspoon dried oregano", "ingredient": "dried oregano" },
      { "text": "Salt and pepper to taste", "ingredient": "Salt and pepper" },
      { "text": "1 1/2 cups shredded mozzarella cheese (or a mix of your favorite cheeses)", "ingredient": "shredded mozzarella cheese" },
      { "text": "Sliced bell peppers", "ingredient": "bell peppers" },
      { "text": "Sliced red onion", "ingredient": "red onion" },
      { "text": "Sliced black olives", "ingredient": "black olives" },
      { "text": "Sliced mushrooms", "ingredient": "mushrooms" },
      { "text": "Sliced tomatoes", "ingredient": "tomatoes" },
      { "text": "Fresh basil leaves", "ingredient": "fresh basil leaves" },
      { "text": "Spinach leaves", "ingredient": "Spinach leaves" },
      { "text": "Artichoke hearts (canned or marinated)", "ingredient": "Artichoke hearts" },
      { "text": "Crumbled feta cheese", "ingredient": "Crumbled feta cheese" },
      { "text": "Red pepper flakes (for a bit of heat, optional)", "ingredient": "Red pepper flakes" }
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
  const location = useLocation();
  const { ownFood, otherPeopleFood } = location.state;

  return (
    <div className="row" >
      {
        recipes.map((recipe, index) => (
          <div className="col-md-4" key={index}>
            <RecipeCard
              ownFood={ownFood}
              otherPeopleFood={otherPeopleFood}
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

const RecipeCard = ({ name, description, imageUrl, ownFood, otherPeopleFood }) => {

  const [showModal, setShowModal] = useState(false); // Add this state
  const [modalMessage, setModalMessage] = useState(''); // Add this state
  const [ingredient, setIngredient] = useState(''); // Add this state

  const [showRecipe, setShowRecipe] = useState(false);
  const [recipe, setRecipe] = useState(recipes[0]);

  const openFood = (ingredient) => {
    if (ownFood.find((food) => food.food === ingredient)) {
      setModalMessage(`You don't need to buy this! You have this ingredient in your pantry.`);
      setIngredient(ingredient);
    } else if (otherPeopleFood.find((food) => food.food === ingredient)) {
      const person = otherPeopleFood.find((food) => food.food === ingredient).username;
      setModalMessage(`You don't need to buy this! You can ask ${person} for this ingredient.`);
      setIngredient(ingredient);
    } else {
      setModalMessage('We couldn\'t find the ingredient in your pantry or your network\'s pantry.');
      setIngredient(ingredient);
    }
    setShowModal(true);
  }

  return (
    <div className="card mt-5">
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{
            `Ingredient: ${ingredient}`
          }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent('Buy ' + ingredient)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary">
              Search on Google
            </Button>
          </a>
        </Modal.Footer>
      </Modal>


      {!showRecipe ?
        <div>
          <img src={imageUrl} className="card-img-top" alt={name} />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            <button
              onClick={() => {
                setShowRecipe(!showRecipe);
                setRecipe(recipes.find((recipe) => recipe.name === name));
              }} variant="primary"
              className='btn btn-success'
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
              <div className="recipe-content mt-3">
                <h3>Ingredients</h3>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      className="text-decoration-underline"
                      style={{ cursor: 'pointer' }}
                      onClick={() => { openFood(ingredient.ingredient) }}
                      key={index}>{ingredient.text}</li>
                  ))}
                </ul>
                <h3>Recipe</h3>
                <p>{recipe.recipe.split('\n').map(text => (
                  <p>{text}</p>
                ))}</p>
              </div>
            </div>

          </div>
          <button onClick={() => setShowRecipe(!showRecipe)} variant="primary"
            className='btn btn-success'
          >
            Done
          </button>
        </div>
      }
    </div>
  );
};

export default RecipesPage;
