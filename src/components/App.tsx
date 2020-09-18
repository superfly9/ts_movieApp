import React, { useState, useEffect, useReducer } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";


interface MovieInfo {
  Poster :string,
  Title : string,
  Type?:string,
  Year : string,
  imdbId?:string
}

interface Action {
  type: string,
  payload?:MovieInfo [],
  error?:string
}

interface InitialState {
  loading : boolean,
  movies : MovieInfo [],
  errorMessage : null | string
}

const initialState:InitialState = {
  loading : true,
  movies : [],
  errorMessage : null
}
const SEARCH_MOVIE_REQUESET = 'SEARCH_MOVIE_REQUEST' as const;
const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS' as const;
const SEARCH_MOVIE_FAILURE = 'SEARCH_MOVIE_FAILURE' as const;
const reducer = (state=initialState,action:Action):InitialState => {
  switch(action.type) {
    case SEARCH_MOVIE_REQUESET:
      return {
        ...state,
        loading : true,
        errorMessage : null
      };
    case SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        loading : false,
        movies : action.payload!
      };
    case SEARCH_MOVIE_FAILURE:
      return {
        ...state,
        loading : false,
        errorMessage : action.error!
      };
    default:
      return state;
  }
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