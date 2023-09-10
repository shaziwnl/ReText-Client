# React Clipboard Animation [![npm](https://img.shields.io/npm/v/react-clipboard-animation.svg?style=flat-square)](https://www.npmjs.com/package/react-clipboard-animation)

A simple clipboard animation in react which allows the user to easily copy text.

![Clipboard Animation Demo](https://github.com/ZaphodElevated/react-clipboard-animation/blob/main/assets/demo.gif?raw=true)

# Installation

Install the package with npm or yarn with either of the following commands.

```
npm i react-clipboard-animation
```

```
yarn add react-clipboard-animation
```

Make sure to import the Clipboard component from the library after it is installed

```js
import Clipboard from 'react-clipboard-animation'
```

# Usage

```js
import './App.css'
import Clipboard from 'react-clipboard-animation'
import React, { useState, useEffect } from 'react'

function App() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <div className='App'>
      <div className='clipboard'>
        <h3 className='clipboard-text'>Hello World!</h3>
        <Clipboard
          copied={copied}
          setCopied={setCopied}
          text='Hello World!'
          color='white'
        />
      </div>
    </div>
  )
}
```

### Example Styling

```css
.App {
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  font-size: calc(10px + 2vmin);
  color: white;
  gap: 1.5rem;
  padding: 2rem;
}

.clipboard {
  display: flex;
  justify-content: center;
  align-items: center;
}

.clipboard-text {
  font-size: 20px;
  font-weight: 300;
  margin-right: 10px;
}
```

# Options

`text` Text to be copied.

`color` Color of the icons. Default is black.

`copied` Boolean variable which returns true when the text is copied.

`setCopied` Function to set the copied variable. Required for checkmark animation to work.

# Browser Compatability

![Clipboard Animation Demo](https://github.com/ZaphodElevated/react-clipboard-animation/blob/main/assets/browser-compatability.png?raw=true)

_Source: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText_

# License

MIT
