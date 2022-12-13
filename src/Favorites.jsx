import React, {useState,useEffect}from 'react'
import RecipeCard from './RecipeCard'

const Favorites = ({liked,likedRecipes}) => {
    let [recipes,setRecipes]= useState([])


    let getLiked = async () =>{
        let response= await fetch('http://openheimer.pythonanywhere.com/api/favorites/',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(liked)
        })
        let data= await response.json()
        setRecipes(data)
    }


    useEffect(()=>{
        getLiked()
        },[])
    const handleClick=(e)=>{
        const i=e.currentTarget.id
        if(e.target.tagName==='path'){likedRecipes(i)}
        }
  return (
    <div className='container'>
    {recipes.length > 0 ?(
    recipes.map((recipe)=>(
        <div  key={recipe.id} id={recipe.id} onClick={handleClick}>
        <RecipeCard  id={recipe.id} title={recipe.title} image={recipe.image_link} liked={liked}/></div>
        )
    )): 
    (<div className='empty'>
    <h2>Nothing Found</h2>
    </div>
    )
    }
</div>
  )
}

export default Favorites