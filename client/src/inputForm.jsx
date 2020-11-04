import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
height: auto;
width: 100%;
display: grid;

grid-template-columns: 20% 40%;
grid-template-rows: auto;
`;
  // grid-template-columns: 25% 25% auto;
// grid-template-rows: 40% 40% auto;

const StyledDiv = styled.div`
  padding: 10px;
`;

const StyledInput = styled.input`
  padding: 10px;
`;

const StyledButton = styled.button`
  padding: 10px;
  border-radius: 5%;
  background-color: rgb(29, 161, 242);
  border: none;
  color: white;
  font-family: Helvetica;
`;


const InputForm = ({filter, formSubmitHandler, handleFormChange}) => {


  return (
    <StyledForm onSubmit={formSubmitHandler}>
      <StyledDiv>From user:</StyledDiv>
      <StyledInput type='text' name='from' value={filter.from} onChange={handleFormChange}/>
      <StyledDiv>To user:</StyledDiv>
      <StyledInput type='text' name='to' value={filter.to} onChange={handleFormChange}/>
      <StyledDiv>Mentions:</StyledDiv>
      <StyledInput type='text' name='mentions' value={filter.mentions} onChange={handleFormChange}/>
      <StyledDiv>Hashtag:</StyledDiv>
      <StyledInput type='text' name='hashtag' value={filter.hashtag} onChange={handleFormChange}/>
      <StyledDiv>Tweet contains:</StyledDiv>
      <StyledInput type='text' name='contains' value={filter.contains} onChange={handleFormChange}/>
      <StyledDiv>Retweets of user:</StyledDiv>
      <StyledInput type='text' name='retweets' value={filter.retweets} onChange={handleFormChange}/>
      <StyledButton type='submit' value='Submit'>Search</StyledButton>
    </StyledForm >
  )
}

export default InputForm;