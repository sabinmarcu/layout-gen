import React from 'react';
import logo from './logo.svg';
import './App.css';

import styled from '@emotion/styled';

const TestComponent = styled.h1`
  color: red;
`;

const test = Math.random();
const testObject = { test: (Math.random() > 0.5 ? null : { test: Math.random() > 0.5 ? null : test}) }
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TestComponent>{(test > 0.5 ? null : test) ?? 'check failed'}</TestComponent>
        <TestComponent>{testObject.test?.test ?? 'object check failed'}</TestComponent>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
