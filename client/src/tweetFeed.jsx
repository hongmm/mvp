import React from 'react';
import Tweets from './tweets.jsx';
import styled from 'styled-components';

const StyledFeed = styled.div`

`;

const TweetFeed = ({streams}) => {
  const streamKeys = Object.keys(streams);
  let tweetsData = [];
  for (let i = 0; i < streamKeys.length; i++) {
    tweetsData.push([streamKeys[i], streams[streamKeys[i]]]);
  }
  // console.log('tuple');
  // console.log(tweetBucketData);
  return (
    <StyledFeed>
      {
        tweetsData.map((tuple) => {
          return (
            <Tweets key={ 'tweets:'+tuple[0] } dataId={ tuple[0] } tweets={ tuple[1] }/>
          )
        })
      }
    </StyledFeed>
  )
}

export default TweetFeed;