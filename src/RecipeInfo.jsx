import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom";


const RecipeInfo = () => {
    let {id}=useParams();
    let [recipe,setRecipe]=useState(null);
    useEffect(()=>{
        getRecipe(id)
    },[id])

    let getRecipe= async(id)=>{
        let response= await fetch(`/api/recipe/${id}`)
        let data= await response.json()
        setRecipe(data)
    }
  return (
    
    <div className='recipeInfo'>
            <h1>*{recipe?.title}:</h1>
            <div className='rowC'>
            <div>
            <strong>*Ingredients: </strong>
            <p>{recipe?.ingredients}</p>
            </div>
            <img src={recipe?.image_link} alt='recipe'/>
            </div>
            <strong>*Instructions: </strong>
            <p>{recipe?.instructions}</p>
            {recipe?(                         
            <a href={`https://www.epicurious.com/recipes/food/views/${recipe?.image}`}><p>see in original website</p></a>
             ):null} 
    </div>
  )
  
}

export default RecipeInfo