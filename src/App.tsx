/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { DbProvider } from './DbContext';
import {
  getBoard, getIsGameOver,
  getNextTurnIndex, getNextPlayer, getIsTied, getSqContent,
printBoard, startingBoard, getWinner } from './board';
import { isEmpty, some_q } from './fp';
import { Message1, Message2 } from './Messages';
import { DebugComponent } from './DebugComponent';
import { Display } from './boardDisplay';
import { Player } from './player';
import CSS from 'csstype';
import './App.css';

const AppStyles: CSS.Properties = { width: '100%', height: '100%' };

function App() {
  return (
    <DbProvider>
      <div style={AppStyles}>
        <Message1 />
        <Display userPlayer={Player.X} />
        <Message2 />
        <DebugComponent />
      </div>
    </DbProvider>
  );
}

export default App;
