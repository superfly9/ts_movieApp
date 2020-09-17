import React, { useState } from "react";


const Search = ({search}:{search(a:string):void}) => {
  const [searchValue, setSearchValue] = useState("");
  
  function handleSearchInputChanges (e:React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.currentTarget.value);
  }

  function resetInputField  (e?:React.ChangeEvent<HTMLInputElement>)  {
    setSearchValue("")
  }

  function callSearchFunction (e:React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  }

  return (
      <form className="search">
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      </form>
    );
}

export default Search;