import {AiFillHeart} from "react-icons/ai";
import React from 'react';
import {Link} from 'react-router-dom'
import { useEffect } from "react";

    

export default function RecipeCard  (recipe)
    {  
        const [wobble, setWobble] = React.useState(0)
        const [color, setColor] = React.useState(0)


        const clicked = (e)=>{
            setWobble(1-wobble)
            setColor(1-color)}

        useEffect(()=>{
            recipe.liked.includes(String(recipe.id))? setColor(1): setColor(0)
        },[])

    


        return(
                    <div className='recipe'>
                        <div >
                        <img src={recipe.image} width='274px' height='169px' alt="recipes"/>
                        </div>
                        <div >
                            <AiFillHeart  className="heart"   size='100px' 
                                onClick={clicked}
                                wobble={wobble}
                                color={color}
                                />
                        </div>
                        <div>
                    <span>
                            <AiFillHeart className="heart"  size='25px' 
                            onClick={clicked}
                            color={color}
                            />
                    </span>
                    <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>

                            <h3>{recipe.title}</h3>
                    </Link>
                    </div>    
                    </div>


    );
        }

