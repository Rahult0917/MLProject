import React from 'react';
import ReactDOM from 'react-dom/client';
import TweetInput from './TweetInput';
import Header from './header'; 

const rootStyle = {
  minHeight: '120vh',
  background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
  padding: '20px',
  boxSizing: 'border-box',
  border: '4px solid black',
  fontFamily: 'Chelsea Market',
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={rootStyle}>
      <Header />
      <TweetInput />
    </div>
  </React.StrictMode>,
);
