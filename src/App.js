import {
  HashRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";

import React ,{useState} from 'react';
import './app.css';
import AllRecipes from './allRecipes';
import RecipeInfo from "./RecipeInfo";
import Recommender from "./Recommender";
import Favorites from "./Favorites";




function App() {
  const SearchIcon='https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg'

  const [search,setSearch]=useState('');
  const [searchTerm,setSearchTerm]=useState('');
  const [liked,setLiked]=useState([])
  const likedRecipes=(i)=>{
    liked.includes(i)?setLiked(liked.filter(e => e !== i)):
    setLiked([...liked,i]);
  }
  const enter=()=>{
    setSearch(searchTerm);
  }



  return (
    <Router>
    <div className="tabs">
      <div className="tab"><Link to={'/'}style={{ textDecoration: 'none' }}><h1>View All</h1></Link></div>
      <div className="tab"><Link to={'/recommended'}style={{ textDecoration: 'none' }}><h1>Recommended</h1></Link></div>
      <div className="tab"><Link to={'/liked'}style={{ textDecoration: 'none' }}><h1>Liked Recipes</h1></Link></div>
    </div>
    <div className='app'>

      <h1>Recipes Recommender</h1>
      <div className='search'>
          <input 
          placeholder='Search...'
          onChange={(e)=>{setSearchTerm(e.target.value)}}
          onKeyDown={(e)=>{e.key==="Enter"?(document.getElementById('searchbutton').click()):(setSearchTerm(e.target.value))}}
          />
      <Link to='/'>
          <img id="searchbutton"
          src={SearchIcon}
          alt='Search'
          onClick={()=>{enter()}}
          />
        </Link>
      </div>


      <Routes>
      <Route path="/recommended" exact element={<Recommender  liked={liked} likedRecipes={likedRecipes}/>}/>
      <Route path="/liked" exact element={<Favorites  liked={liked} likedRecipes={likedRecipes}/>}/>
      <Route path="/" exact element={<AllRecipes search={search} liked={liked} likedRecipes={likedRecipes} />}/>
      <Route path="/page/:p" exact element={<AllRecipes search={search} liked={liked} likedRecipes={likedRecipes} />}/>
      <Route path="/recipe/:id" element={<RecipeInfo />} />
      </Routes>


    </div>
    </Router>
  );

}

export default App;
