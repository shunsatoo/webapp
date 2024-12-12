"use client";
import './App.css';
import {useEffect, useState} from'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState();
  
  // Go -> React
  useEffect(() => {
    const getData = async () => {
      try{
        const res = await axios.get('/api');
        setData(res.data);
      }catch(e){
        console.log(e);
      }
    }
    getData();
  }, [])

  // React -> Go
  const createPost = () => {
    axios.post('/api/message', {message: 'This message from React'});
  }
  

  return (
    <div className="App">
      <h1>Hello, World</h1>
      <div>Recieved -&gt; {data ? data : 'No data'}</div>
      <br/><br/>
      <button onClick={createPost}>Create POST</button>
    </div>
  );
}

export default App;