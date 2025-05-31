import React from 'react';
import ClaudeRecipe from './ClaudeRecipe';
import IngredientsList from './IngredientsList';
//import {getRecipeFromMistral} from "../../ai";
import {getRecipeFromChefClaude} from "../../ai";

export default function Main() {

  const [ingredients,setIngredients] = React.useState([]);


  function addIngredient(formData) {

    const newIngredient = formData.get('ingredient');

    setIngredients((prevIngredients) => {
      return [...prevIngredients,newIngredient];
    });

    console.log(ingredients);
  }

  const [recipe,setRecipe] = React.useState("");

  //using useRef for scrolling the page down when the recipe loads
  const recipeSection = React.useRef(null);

  //using useEffect to scroll down to the view when we get recipe from API
  React.useEffect(() => {
    if(recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({behavior: "smooth"});
    }
  },[recipe]);


  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
    setRecipe(recipeMarkdown);
  }

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const newIngredient = formData.get("ingredient");

  //   setIngredients((prevIngredients) => {
  //     return [...prevIngredients,newIngredient];
  //   });
  //   // ingredients.push(newIngredient);
  //   console.log(ingredients);
  // }

  return (
    <main>
      <form action={addIngredient} /*onSubmit={handleSubmit}*/ className="add-ingredient-form">
        <input
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. oregano"
          name="ingredient"
        />
        <button>Add ingredient</button>

      </form>

      {ingredients.length > 0 &&
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          ref={recipeSection}
        />
      }

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>

  );
}