import React from 'react';
import styled from 'styled-components';

const TweetsBody = styled.div`
  margin: 15px;
  padding: 15px;
  border: solid rgb(29, 161, 242);
  border-radius: 15px;
`;

const TweetHeader = styled.div`
  font-weight: bold;
  padding-bottom: 10px;
`;

const TweetInfo = styled.div`
  padding: 5px;
`;

const Tweets = ({dataId, tweets}) => {
  return (
    <TweetsBody>
      <TweetHeader>
        { dataId }
      </TweetHeader>
      {
        tweets.map((tweet) =>
        {
          return (
            <TweetInfo key={tweet.id}>
              {tweet.text}
            </TweetInfo>
          )
        })
      }
    </TweetsBody>
  )
}

export default Tweets;