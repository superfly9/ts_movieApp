import {
    InitialState,Action,SEARCH_MOVIE_REQUESET,SEARCH_MOVIE_SUCCESS,SEARCH_MOVIE_FAILURE
} from '../types/types'


const reducer = (state:InitialState,action:Action):InitialState => {
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
export default reducer;