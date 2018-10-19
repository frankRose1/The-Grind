import React from 'react';
import styled from 'styled-components';
import SignIn from '../containers/Auth';
import SignUp from '../containers/SignUp';

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 35px;
  align-items: center;
`;

const Account = () => {
  return (
    <FormGrid>
      <SignIn />
      <SignUp />
    </FormGrid>
  );
};

export default Account;