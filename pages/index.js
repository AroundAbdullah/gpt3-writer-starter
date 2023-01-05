import Head from 'next/head';
import Image from 'next/image';
// import profileLogo from '../assets/Abdullah-Logo.png';
import Typical from 'react-typical';
import { useState } from 'react';


const Home = () => {
const [userInput, setUserInput] = useState('');
const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
};

  return (
    <div className="root">
      <Head>
        <title>Tweet Generator</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>tweet generator 📚</h1>
          </div>
          <div className="header-subtitle">
            <h2><Typical
                  loop={1}
                  wrapper='b'
                  steps={[
                    'write the first liner for your tweet below!',
                    100,
                  ]}
                  />
              </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="start typing your tweet title in here" className="prompt-box" value={userInput} onChange={onUserChangedText} />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.linkedin.com/in/abdullahatif/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            {/* <Image src={profileLogo} alt="Abdullah's Profile Logo" /> */}
            <p>Built by Abdullah</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
