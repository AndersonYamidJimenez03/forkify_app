import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView';


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



const controlRecipes = async function(){
  try{
    const id = window.location.hash.slice(1);

    if(!id) return;
  
    recipeView.renderSpinner();

    // 1 Loading  recipe
    await model.loadRecipe(id);

    // 2 Rendering recipe
    recipeView.render(model.state.recipe);
    
  }catch(err){
    recipeView.renderError();
  }
}

const constrolSearchResult = async function (){
  try{
    // 1 Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2 Load search result
    await model.loadSearchResult(query);

    // 3 Render result
    console.log(model.state.search.results);
  }catch(err){
    console.log(err);
  }
}

constrolSearchResult();

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHeandlerSearch(constrolSearchResult);
}

init();



