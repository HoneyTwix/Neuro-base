import logo from './logo.svg';
import './App.css';
import React, { useReducer, useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Link,
  Router,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Table from './pages/Table';
import File from './pages/File';
import Filename from './pages/Filename';
import Session from './pages/Session';
import FilenameTable from './pages/FilenameTable';
import SessionTable from './pages/SessionTable';
import Nav from './pages/Nav';

function App() {
  
  return (
    
    
    <Routes>
      <Route path='/' element={<Nav />} />
      <Route path="https://neuro-base.herokuapp.com/" element={<Nav/>}/>
      <Route path="https://neuro-base.herokuapp.com/anova_sf1" element={<File/>}/>
      <Route path="https://neuro-base.herokuapp.com/table" element={<Table/>}/>
      <Route path='https://neuro-base.herokuapp.com/filename' element = {<Filename/>}/>
      <Route path='https://neuro-base.herokuapp.com/session' element = {<Session/>}/>
      <Route path='https://neuro-base.herokuapp.com/filenameTable' element = {<FilenameTable/>}/>
      <Route path='https://neuro-base.herokuapp.com/sessionTable' element = {<SessionTable/>}/>
    </Routes>
);
}

export default App;
