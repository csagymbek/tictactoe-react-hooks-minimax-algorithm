import React from 'react'
import Game from "./components/Game";
import styled from "styled-components";
import "papercss/dist/paper.min.css";

export default function App(){
  return (
    <Main>
      <Game />
    </Main>
  )
}

const Main = styled.main `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
