import React from "react";
import { Button, Dimensions } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

function WelcomeScreen() {
  function handleClick() {
    console.log("click");
  }

  return (
    <>
      <Container>
        <Button title="Get Start" onPress={handleClick} />
      </Container>
    </>
  );
}

export default WelcomeScreen;
