
import './App.css';

import React, { useState } from 'react'
import Navbar from './MyComponents/Navbar';
import News from './MyComponents/News';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default function App () {
  const [mode, setmode] = useState('light')
  const [progress, setProgress] = useState(0)
  const toggle= ()=>{
    if(mode==='light'){
      setmode({mode:'dark'});
      document.body.style.backgroundColor='#101010';
    }
    else{
      setmode('light');
      document.body.style.backgroundColor ='white'
    }
  }
 

    return (
      <>
      <Router>
      <Navbar mode={mode} toggle={toggle}/>
      <LoadingBar
      height={3}
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="general" mode={mode} pageSize={6} country="in" category='general'/>}></Route> 
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" mode={mode} pageSize={6} country="in" category='business'/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" mode={mode} pageSize={6} country="in" category='entertainment'/>}></Route>
          <Route exact path="/general" element={<News setProgress={setProgress} key="general" mode={mode} pageSize={6} country="in" category='general'/>}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" mode={mode} pageSize={6} country="in" category='health'/>}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" mode={mode} pageSize={6} country="in" category='science'/>}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" mode={mode} pageSize={6} country="in" category='sports'/>}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" mode={mode} pageSize={6} country="in" category='technology'/>}></Route>
      </Routes>
      </Router>
      </>
    )
  }


