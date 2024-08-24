import { useState, useCallback, useEffect, useRef } from "react";
import './style.css'; // Import the CSS file

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState('');

  const passRef = useRef(null);

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "123456789";
    if (characters) str += "!@#$%^&*()";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, characters]);

  const copyToClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGen();
  }, [length, number, characters, passwordGen]);

  return (
    <div className="container">
      <h1 className="title">Password Generator</h1>
      <div className="password-section">
        <input 
          type="text"
          value={password}
          className="password-input"
          placeholder="Password"
          readOnly
          ref={passRef}
        />
        <button onClick={copyToClipboard} className="copy-button">Copy</button>
      </div>
      <div className="settings">
        <div className="range-wrapper">
          <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="range-slider"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="range-label">Length: {length}</label>
        </div>
        <div className="checkbox-wrapper">
          <input 
            type="checkbox"
            checked={number}
            onChange={() => setNumber(prev => !prev)}
          />
          <label>Numbers</label>
        </div>
        <div className="checkbox-wrapper">
          <input 
            type="checkbox"
            checked={characters}
            onChange={() => setCharacters(prev => !prev)}
          />
          <label>Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
