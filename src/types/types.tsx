export const SEARCH_MOVIE_REQUESET = 'SEARCH_MOVIE_REQUEST' as const;
export const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS' as const;
export const SEARCH_MOVIE_FAILURE = 'SEARCH_MOVIE_FAILURE' as const;

export interface MovieInfo {
    Poster :string,
    Title : string,
    Type?:string,
    Year : string,
    imdbId?:string
}
  
export interface Action {
    type: string,
    payload?:MovieInfo [],
    error?:string
}
  
export interface InitialState {
    loading : boolean,
    movies : MovieInfo [],
    errorMessage : null | string
}  