import React, { useState, useEffect, useReducer } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import {
  InitialState,Action,MovieInfo,SEARCH_MOVIE_FAILURE,SEARCH_MOVIE_SUCCESS,SEARCH_MOVIE_REQUESET
} from '../types/types'
import reducer from '../reducer/index'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState:InitialState = {
  loading : true,
  movies : [],
  errorMessage : null
}

const App = () => {
  const [state,dispatch] = useReducer(reducer,initialState)
    useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: SEARCH_MOVIE_SUCCESS,
          payload: jsonResponse.Search
      });
    });
  }, []);

    const search = (searchValue:string):void => {
      dispatch({
      	type: SEARCH_MOVIE_REQUESET
    	});

      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.Response === "True") {
          	dispatch({
              type: SEARCH_MOVIE_SUCCESS,
              payload: jsonResponse.Search
          });
          } else {
          	dispatch({
              type: SEARCH_MOVIE_FAILURE,
              error: jsonResponse.Error
          });
          }
        });
  	};

    const { movies, errorMessage, loading } = state;

    return (
     <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie:MovieInfo, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};


export default App;