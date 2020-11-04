import React from 'react';
import ReactDOM from 'react-dom';
import TweetStreamer from './tweetStreamer.jsx';

const App = () => (
  <TweetStreamer />
)

ReactDOM.render(<App />, document.getElementById('tweet-streamer'));