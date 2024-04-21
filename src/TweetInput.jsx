import React, { useState } from 'react';

function TweetInput() {
  const [tweet, setTweet] = useState('');
  const [result, setResult] = useState('');  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tweet) return;  

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review: tweet })
      });
      const data = await response.json();
      setResult(data.prediction);  
      setTweet('');  
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch the prediction');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center',
      marginTop: '20px',
      fontFamily: 'Chelsea Market',
    },
    form: {
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center',
      width: '100%',
      fontFamily: 'Chelsea Market', 
    },
    label: {
      marginBottom: '10px',
      fontWeight: 'bold',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Chelsea Market',      
    },
    input: {
      width: '300px', 
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      alignItems: 'center',
      borderRadius: '5px',
      fontFamily: 'Chelsea Market',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#1DA1F2',
      color: 'white',
      cursor: 'pointer',
      fontFamily: 'Chelsea Market',
    },
    result: { 
      color: 'white',
      fontSize: '20px',
      marginTop: '20px',
      fontFamily: 'Chelsea Market',
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="tweetInput" style={styles.label}>Insert Tweet Here</label>
        <input
          id="tweetInput"
          type="text"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          placeholder="What's happening?"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {result && <p style={styles.result}>The review is {result}.</p>}
    </div>
  );
}

export default TweetInput;


