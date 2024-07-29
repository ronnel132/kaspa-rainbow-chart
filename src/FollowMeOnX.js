import React from 'react';
import { XIcon } from 'react-share';
import x_profile from './assets/x_profile.jpg';

const FollowMeOnX = () => {
  const handleClick = () => {
    window.open('https://x.com/xetur132', '_blank');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Center the widget horizontally
        alignItems: 'center',
        backgroundColor: 'transparent', // Make the background transparent
      }}
    >
      <div
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection:'column',
          cursor: 'pointer',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: 'transparent', // Make the widget background transparent
        }}
      >
        <div style={{ background: '#343132', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', width: '250px', margin: '0 auto' }}>
          <img
            src={x_profile}
            alt="Profile"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              marginRight: '10px',
            }}
          />
          <span style={{ paddingTop: '16px', fontSize: '16px', color: 'white', fontWeight: 'bolder' }}>@xetur132</span> {/* Black color for the handle */}
        </div>
      </div>
    </div>
  );
};

export default FollowMeOnX;
