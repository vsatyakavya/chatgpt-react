import {useState} from 'react';
import axios from 'axios'
import CGLogo from './chatGPT.png';
import AppLogo from './app-logo.png';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) =>{
     e.preventDefault();
     setLoading(true);

     //communicate with openAI API
     axios
      .post("http://localhost:5555/chat", {prompt})
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
     .catch((err) =>{
       console.log(err);
     })


  }
  return (
     <div className ="wrapper">
      <img src ={AppLogo}  alt="" className ="app-logo"/>
      <form onSubmit={handleSubmit}>
        <img src={CGLogo} alt="" className ={loading ? "cg-logo loading" : "cg-logo"}/>
        <input 
        type = "text"
        value={prompt}
        onChange = {(e) => setPrompt(e.target.value)}
        placeholder = "Ask Anything...)"
        />
        <button type="submit">Ask</button>
      </form>

      <p className='response-area'>
        {loading ? 'loading...'  : response}
      </p>
     </div>
  );
}

export default App;
