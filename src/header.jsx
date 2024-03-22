import React from 'react';

const styles = {
  header: {
    backgroundColor: '#1DA1F2',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    borderRadius: '25px',
    fontFamily: 'Chelsea Market',
  }
};

function Header() {
  return (
    <div style={styles.header}>
      Tweet Analysis
    </div>
  );
}

export default Header;
