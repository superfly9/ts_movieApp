// title을 props로 받고 제목 렌더링
import React from "react";

function Header ({text}:{text:string}) {
  return (
    <header className="App-header">
      <h2>{text}</h2>
    </header>
  );
};

export default Header;