import React,{useState,useEffect} from 'react';
import RecipeCard from './RecipeCard' 
import {useParams,Link} from "react-router-dom";


export default function AllRecipes({search,likedRecipes,liked}) {
    const searchTerm=search.replace(' ','+')
    let [recipes,setRecipes]= useState([])

    let {p}=useParams();

    const handleClick=(e)=>{
      const i=e.currentTarget.id
      if(e.target.tagName==='path'){likedRecipes(i)}
    }

    let getRecipes = async (searchTerm) =>{
      let response= await fetch(`/api/${searchTerm}`)
      let data= await response.json()
      setRecipes(data)
    }
    useEffect(()=>{
      if(searchTerm===''){
      if(typeof(p)==='string'){getRecipes(p)} else{getRecipes('')}}
    },[p,searchTerm])
    useEffect(()=>{
      if(searchTerm!==''){getRecipes(searchTerm)}
    },[searchTerm])

  
    
  return (
      <div>
        <div className="navigation">
          {searchTerm===''?(<>
          {Number(p)>0 ?(<>{p==='1'?(
            <Link to={'/'} style={{ textDecoration: 'none' }}><h1>&lt;previouspage</h1></Link>
          ):(
            <Link to={`/page/${Number(p)-1}`} style={{ textDecoration: 'none' }}><h1>&lt;previouspage</h1></Link>
          )}</>        
          ): <div className='nocolor'>&lt;previouspage</div>}
          {typeof(p)==='string'?(
          <Link to={`/page/${Number(p)+1}`} style={{ textDecoration: 'none' }}><h1>nextpage&gt;</h1></Link>
          ):(
          <Link to={'/page/1'} style={{ textDecoration: 'none' }}><h1>nextpage&gt;</h1></Link>)}
          </>):null}
        </div>
        <div className='container'>
          {recipes.length > 0 ?(
            recipes.map((recipe)=>(
              <div  key={recipe.id} id={recipe.id} onClick={handleClick}>
              <RecipeCard  id={recipe.id} title={recipe.title} image={recipe.image_link} liked={liked} /></div>
              )
            )): 
            (<div className='empty'>
            <h2>NO Match Found</h2>
            </div>
            )

          }
        </div> 
      </div>


  
    
    )
}
