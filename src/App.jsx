import './App.css'
import React,{ useState, useEffect } from "react";
import Clipboard from 'react-clipboard-animation';
import axios from "axios";
import loadingGif from "../images/loading.gif"

function App() {
  // All States
  const [copied1, setCopied1] = useState(false)
  const [copied2, setCopied2] = useState(false)
  const [copied3, setCopied3] = useState(false)
  const [rectified, setRectified] = useState("")
  const [concise, setConcise] = useState("")
  const [verbose, setVerbose] = useState("")
  const [highlightedText, setHighlightedText] = useState("")

  var config = { headers: {  
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'}
  }

  function extractSelectedText() {
    var selectedText = window.getSelection().toString();
    return selectedText;
  }
  

  function handleClick() {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0]; // Get the tab we are currently on

      // Use the chrome.scripting API to inject a content script
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          function: extractSelectedText
        },
        function (result) {
          // Handle the result returned by the content script
          var selectedText = result[0].result;
          setHighlightedText(selectedText)
          console.log(selectedText);

          if (selectedText) {
            axios.post("https://pennapps.onrender.com/rectify", { sentence: selectedText }, config)
                .then(res => setRectified(res.data.completion))

            axios.post("https://pennapps.onrender.com/concise", { sentence: selectedText }, config)
                .then(res => setConcise(res.data.completion))

            axios.post("https://pennapps.onrender.com/verbose", { sentence: selectedText }, config)
                .then(res => setVerbose(res.data.completion))
          }
        }
      )
    })
  }

  useEffect(() => {
    handleClick()
  }, [])

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      if (copied1) setCopied1(false)
    }, 1000)
    return () => clearTimeout(timeout1)
  }, [copied1])


  useEffect(() => {
    const timeout2 = setTimeout(() => {
      if (copied2) setCopied2(false)
    }, 1000)
    return () => clearTimeout(timeout2)
  }, [copied2])
  

  useEffect(() => {
    const timeout3 = setTimeout(() => {
      if (copied3) setCopied3(false)
    }, 1000)
    return () => clearTimeout(timeout3)
  }, [copied3])
  

  // Hover Effect
  const [isButtonVisible1, setIsButtonVisible1] = useState(false);
  const [isButtonVisible2, setIsButtonVisible2] = useState(false);
  const [isButtonVisible3, setIsButtonVisible3] = useState(false);

  const handleMouseEnter1 = () => {
    setIsButtonVisible1(true);
  };

  const handleMouseLeave1 = () => {
    setIsButtonVisible1(false);
  };

  const handleMouseEnter2 = () => {
    setIsButtonVisible2(true);
  };

  const handleMouseLeave2 = () => {
    setIsButtonVisible2(false);
  };

  const handleMouseEnter3 = () => {
    setIsButtonVisible3(true);
  };

  const handleMouseLeave3 = () => {
    setIsButtonVisible3(false);
  };
  
  return (
    <>
      <div className='cards'>
        <div className = "card">
          <h3 className='head'>Rectified</h3>
          <div onMouseEnter={handleMouseEnter1}
               onMouseLeave={handleMouseLeave1} className="content">
          {isButtonVisible1 && (
            <div class="float">
              <Clipboard
          copied={copied1}
          setCopied={setCopied1}
          text= {rectified}
          color='white'
        /> </div>
        )}
        {(!rectified && highlightedText) ?  <h2>Loading...</h2> : rectified}
          </div>
        </div>

        <div className = "card">
          <h4 className='head'>Rephrased</h4>
          <h4 className="sub-head">Concise, less wordy</h4>
          <div onMouseEnter={handleMouseEnter2}
               onMouseLeave={handleMouseLeave2} className="content">
          {isButtonVisible2 && (
            <div class="float">
            <Clipboard
            copied={copied2}
            setCopied={setCopied2}
            text= {concise}
            color='white'
          /></div>
          )}
        {(!concise && highlightedText) ?  <h2>Loading...</h2> : concise}
        </div>

          <h4 className="sub-head">Clearer, more verbose</h4>
          <div onMouseEnter={handleMouseEnter3}
          onMouseLeave={handleMouseLeave3} className="content">

          {isButtonVisible3 && (
            <div class="float">
            <Clipboard
            copied={copied3}
            setCopied={setCopied3}
            text={verbose}
            color='white'
          /></div>
          )}
        {(!verbose && highlightedText) ?  <h2>Loading...</h2> : verbose}
        </div>

        {/* <button onClick={handleClick}>Create</button> */}

        </div>
      </div>
  </>
)
}

export default App;