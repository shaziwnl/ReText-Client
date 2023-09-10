import './App.css'
import React,{ useState, useEffect } from "react";
import Clipboard from 'react-clipboard-animation';
import axios from "axios";

function App() {
  // All States
  const [copied1, setCopied1] = useState(false)
  const [copied2, setCopied2] = useState(false)
  const [copied3, setCopied3] = useState(false)
  const [rectified, setRectified] = useState("")
  const [concise, setConcise] = useState("")
  const [verbose, setVerbose] = useState("")

  // function handleClick() {
  //   if (window.getSelection) {

  //     const highlightedText = window.getSelection().toString()

  //     console.log(highlightedText)

  //     axios.post("http://127.0.0.1:8000/rectify", { sentence: highlightedText })
  //          .then(res => setRectified(res.data.completion))

  //     axios.post("http://127.0.0.1:8000/concise", { sentence: highlightedText })
  //          .then(res => setConcise(res.data.completion))

  //     axios.post("http://127.0.0.1:8000/verbose", { sentence: highlightedText })
  //          .then(res => setVerbose(res.data.completion))

  //   }
  // }

  useEffect( () => {
    if (window.getSelection) {

      const highlightedText = window.getSelection().toString()

      console.log(highlightedText)

      axios.post("https://pennapps.onrender.com/rectify", { sentence: highlightedText })
           .then(res => setRectified(res.data.completion))

      axios.post("https://pennapps.onrender.com/concise", { sentence: highlightedText })
           .then(res => setConcise(res.data.completion))

      axios.post("https://pennapps.onrender.com/verbose", { sentence: highlightedText })
           .then(res => setVerbose(res.data.completion))
    }
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
          text= { rectified }
          color='white'
        /> </div>
        )}
        { rectified }
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
            text= { concise }
            color='white'
          /></div>
          )}
        { concise }
        </div>

          <h4 className="sub-head">Clearer, more verbose</h4>
          <div onMouseEnter={handleMouseEnter3}
          onMouseLeave={handleMouseLeave3} className="content">

          {isButtonVisible3 && (
            <div class="float">
            <Clipboard
            copied={copied3}
            setCopied={setCopied3}
            text={ verbose }
            color='white'
          /></div>
          )}
        { verbose }
        </div>

      </div>
    </div>
  </>
)
}

export default App;