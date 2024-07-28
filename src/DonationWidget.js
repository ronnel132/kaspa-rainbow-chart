import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import qr_code from './assets/donation.jpeg';
import IconButton from '@mui/material/IconButton';
import ContentCopy from '@mui/icons-material/ContentCopy';

const DonationWidget = () => {
  const address = 'kaspa:qpk37e7pn9x9nm85nqnwyk8ffjp6tln8m8sna5vdd6rw068zy2xvu6jf4q7ep';

  return (
    <div style={{ background: '#343132', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', width: '250px', margin: '0 auto' }}>
      <h3 style={{ color: 'white', fontWeight: 'bolder' }}>Donate Kaspa</h3>
      <img src={qr_code} alt="Kaspa QR Code" style={{ width: '200px', height: '200px' }}/>
      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0', color: 'white', wordBreak: 'break-all' }}>
        <span style={{ textAlign: 'center' }}>{address}</span>
        <CopyToClipboard text={address}>
          <IconButton style={{ color: 'white', paddingLeft: '8px' }}>
            <ContentCopy />
          </IconButton>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default DonationWidget;
