import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import DonationWidget from './DonationWidget';
import PriceChart from './Chart';

function App() {
  document.title = "Kaspa Rainbow Chart";

  const [priceData, setPriceData] = useState({});

  useEffect(() => {
    fetch('/prices.json')
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((item) => {
          return {
            date: item.date,
            price: parseFloat(parseFloat(item.price.replace('$', '')).toFixed(7)),
          };
        });
        setPriceData(transformedData);
      })
      .catch((error) => console.error('Error fetching the prices data:', error));
  }, []);

  const isMobileDeviceWithTouch = () => {
    // Check for touch events support
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  
    // Check for mobile user agents
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
  
    return hasTouchScreen && isMobile;
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        backgroundColor: '#292828',
        padding: '20px',
        borderRadius: '10px',
        color: '#fff',
        marginTop: '20px',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        style={{ color: '#fff', fontWeight: 'bolder' }}
      >
        Kaspa Rainbow Chart
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        align="center"
        style={{ color: '#ccc', marginBottom: '15px' }}
      >
        Price according to the power law
      </Typography>
      <PriceChart priceData={priceData} isMobile={isMobileDeviceWithTouch()}/>
      <Typography
        component="h4"
        gutterBottom
        align="center"
        style={{ color: '#ccc', marginBottom: '15px' }}
      >
        { isMobileDeviceWithTouch() ?
          'Pinch to zoom. Double click to reset.' :
          'Click and drag a region to zoom in. Double click to reset.'
        }
      </Typography>
      <Typography
        component="h4"
        gutterBottom
        align="center"
        style={{ color: '#ccc', marginTop: '35px', marginBottom: '15px' }}
      >
        Also check out <a style={{ color: "white" }} href="https://kaspapowerlaw.com">KaspaPowerLaw.com</a> for the Kaspa Fair Price Calculator.
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom="20px"
      >
      </Box>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        align="center"
        style={{ marginTop: '20px', color: 'white', fontWeight: 'bolder' }}
      >
        FAQ
      </Typography>
      <Paper
        elevation={3}
        style={{
          padding: '20px',
          backgroundColor: '#444',
          borderRadius: '15px',
        }}
      >
        <Typography variant="body1" component="p" style={{ color: '#fff' }}>
          <strong>1) What is Kaspa's Power Law?</strong>
        </Typography>
        <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
          The Kaspa power law is a mathematical relationship between Kaspa's price and time, that allows us to forecast Kaspa's potential future price action based on historical data.
          The power law is demonstrated by plotting Kaspa's price vs time in a log-log chart, where it appears as a straight line.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginTop: '10px', color: '#ccc' }}
        >
          The only other asset which behaves this way is Bitcoin.
        </Typography>
        <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
          <strong>2) How accurate is it?</strong>
        </Typography>
        <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
          The R² of the linear regression in log-log is <b>0.95</b>. Meaning the power law accounts for 95% of the variance in log-prices. For comparison, the R² of Bitcoin is 0.96.
        </Typography>
        <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
          <strong>3) How is this calculated?</strong>
        </Typography>
        <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
          Support price is calculated as 10^-13.41344198 * (ΔGB)^4.218461.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginTop: '10px', color: '#ccc' }}
        >
          Resistance price is calculated as 10^-13.10611888 * (ΔGB)^4.218461.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginTop: '10px', color: '#ccc' }}
        >
          Fair price is calculated as 10^-13.25978043 * (ΔGB)^4.218461.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginTop: '10px', color: '#ccc' }}
        >
          Where <b>ΔGB</b> is days since the Kaspa Genesis Block, the 7th of November, 2021.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginTop: '10px', color: '#ccc', fontStyle: 'italic' }}
        >
          [Power Law Equations Updated 2024-07-22]
        </Typography>
        <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
          <strong>4) Where can I learn more about Kaspa?</strong>
        </Typography>
        <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
          Visit the Kaspa project's website: <a style={{ color: 'white' }} href="https://kaspa.org/">https://kaspa.org</a>.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginTop: '10px', color: '#ccc' }}
        >
          Check out streamlit's Kaspa rainbow chart: <a style={{ color: 'white' }} href="https://kasping.streamlit.app/">https://kasping.streamlit.app/</a>.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginTop: '10px', color: '#ccc' }}
        >
          Marvel at the growth of Kaspa's hash rate: <a style={{ color: 'white' }} href="https://2miners.com/kas-network-hashrate">https://2miners.com/kas-network-hashrate</a>.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginTop: '10px', color: '#ccc' }}
        >
          See Kaspa block-DAG processed in real time: <a style={{ color: 'white' }} href="https://kgi.kaspad.net/">https://kgi.kaspad.net/</a>.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginTop: '10px', color: '#ccc' }}
        >
          Check out the Kaspa Industrial Initiative: <a style={{ color: 'white' }} href="https://kaspa-kii.org/">https://kaspa-kii.org/</a>.
        </Typography>
        <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20 }}>
          <strong>5) How can I buy Kaspa?</strong>
        </Typography>
        <Typography variant="body2" component="p" style={{ color: '#ccc' }}>
          I use the Tangem wallet (<a style={{ color: 'white' }} href="https://tangem.com/en/?promocode=KE8DCR">https://tangem.com</a>) to exchange BTC to KAS through the integrated swap.
          I prefer Tangem for its ease of use, cold storage (keep your Kaspa off exchanges!) and backup cards.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginTop: '10px', color: '#ccc' }}
        >
          The link above is a 10%-off referral link which provides me a small percentage to run this website. If you like my work, consider supporting.
        </Typography>
      </Paper>
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 20, textAlign: 'center' }}>
        <strong>Want to support this website?</strong>
      </Typography>
      <Typography variant="body2" component="p" style={{ color: '#ccc', marginBottom: 20, textAlign: 'center' }}>
        If you find this website useful, consider donating some Kaspa. It helps me run the website and build more tools like this.
      </Typography>
      <DonationWidget/>
      <Typography variant="body1" component="p" style={{ color: '#fff', marginTop: 40, textAlign: 'center' }}>
        Credit to <a style={{ color: 'white' }} href="https://www.blockchaincenter.net/en/bitcoin-rainbow-chart/">https://www.blockchaincenter.net/en/bitcoin-rainbow-chart/</a> for the inspiration for this site.
      </Typography>
    </Container>
  );
}

export default App;
