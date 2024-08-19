import './App.css'
import React, { useState, useEffect } from "react";
import Clipboard from 'react-clipboard-animation';
import Loading from './components/Loading';
import { Tooltip } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios";
import IOSSwitch from './components/IOSSwitch';

function App() {
  // All States
  const [copied1, setCopied1] = useState(false)
  const [copied2, setCopied2] = useState(false)
  const [copied3, setCopied3] = useState(false)
  const [useClipboard, setUseClipboard] = useState(false)
  const [rectified, setRectified] = useState("")
  const [concise, setConcise] = useState("")
  const [verbose, setVerbose] = useState("")
  const [highlightedText, setHighlightedText] = useState("")
  const [history, setHistory] = useState([])
  const URL = import.meta.env.VITE_URL

  var config = { headers: {  
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'}
  }

  function extractSelectedText() {
    var selectedText = window.getSelection().toString();
    return selectedText;
  }

  function setSelectedText() {
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

      }
    )
    })
  }

  function sendHighlightedText(selectedText) {
    if (selectedText) {
      axios.post(`${URL}/rectify`, { sentence: selectedText }, config)
          .then(res => setRectified(res.data.completion))

      axios.post(`${URL}/concise`, { sentence: selectedText }, config)
          .then(res => setConcise(res.data.completion))

      axios.post(`${URL}/verbose`, { sentence: selectedText }, config)
          .then(res => setVerbose(res.data.completion))
      
      setHistory((prev) => {
        if (prev.includes(selectedText)) return prev
        else return [selectedText, ...prev]
      })

    }
  }

  useEffect(() => {
    chrome.storage.sync.get(['history'], (data) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        setHistory(data.history ? data.history : []);
        chrome.storage.sync.getBytesInUse('history')
        .then((bytesInUse) => {console.log("BIU", bytesInUse)})
      }
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({ history: history }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    })
  }, [history])

  useEffect(() => {
    setSelectedText();
  }, [])

  useEffect(() => {
    setConcise("")
    setRectified("")
    setVerbose("")
    sendHighlightedText(highlightedText);
  }, [highlightedText])


  useEffect(() => {
    if (useClipboard) {
      navigator.clipboard.read()
      .then((clipboardData) => {
        if (clipboardData && !highlightedText) {

          for (const item of clipboardData) {
            for (const type of item.types) {
              if (type === 'text/plain') {
                item.getType(type)
                    .then(blob => {
                      blob.text()
                          .then(text => {
                            console.log(text)
                            setHighlightedText(text)
                          })
                    })
              }
            }
          }
        } else {
          console.log("Option is off")
        }
      })
      
    } 
  }, [useClipboard])

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
      
      <Tooltip title="Uses clipboard if no text is highlighted" placement='right'>
        <FormControlLabel sx={{marginLeft: "235px"}} 
          control={<IOSSwitch checked={useClipboard} onChange={() => setUseClipboard(prev => !prev)}/>}
          label="Use Clipboard"
        />
      </Tooltip>

      <div className='cards'>

        <div className = "card">      
          <h3 className='head'>Rectified</h3>
          <div onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1} className="content">
            {isButtonVisible1 && (
              <div class="float">
                <Clipboard
                copied={copied1}
                setCopied={setCopied1}
                text= {rectified}
                color='white'
                /> 
              </div>)}
            {(!rectified && (highlightedText)) ?  <Loading/> : rectified}
          </div>
        </div>

        <div className = "card">
          <h4 className='head'>Rephrased</h4>
          <h4 className="sub-head">Concise, less wordy</h4>
          <div onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2} className="content">
            {isButtonVisible2 && (
              <div class="float">
                <Clipboard
                copied={copied2}
                setCopied={setCopied2}
                text= {concise}
                color='white'
                />
              </div>)}
            {(!concise && (highlightedText)) ?  <Loading/> : concise}
          </div>

          <h4 className="sub-head">Clearer, more verbose</h4>
          <div onMouseEnter={handleMouseEnter3} onMouseLeave={handleMouseLeave3} className="content">
            {isButtonVisible3 && (
              <div class="float">
                <Clipboard
                copied={copied3}
                setCopied={setCopied3}
                text={verbose}
                color='white'
                />
              </div>)}
            {(!verbose && (highlightedText)) ?  <Loading/> : verbose}
          </div>
        </div>

      </div>
      
      <h4 className='head'>History</h4>
      <div className='history'>
        {history.map((item) => {
          item = item.charAt(0).toUpperCase() + item.slice(1)
          return (
            <div className='content history-item'>{item}</div>
          )
        })}
      </div>
      
    </>
  )
}

export default App;