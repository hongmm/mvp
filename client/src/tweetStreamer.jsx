import React, { useState } from 'react';
import TweetFeed from './tweetFeed.jsx';
import InputForm from './inputForm.jsx';
import axios from 'axios';
import styled from 'styled-components';


const TweetStreamerTitle = styled.div`
  font-size: 2em;
  font-weight: bold;
`;

const InputFormTitle = styled.div`
  font-size: 1.25em;
  font-weight: bold;
`;

const AppStyles = styled.div`
  font-family: Helvetica;
`;

const TweetStreamer = (props) => {
  const [streams, setStreams] = useState({});
  const [filter, setFilter] = useState({from: '', to: '', mentions: '', hashtag: '', contains: '', retweets: ''});
  const [prevFilter, setPrevFilter] = useState('');

  // streams = [{tweets, rules}]
  // filters = {username, topic, retweets, mentions}

  // on click, get the new tweets for that block

  const handleFormChange = (event) => {
    // setFilters

    setFilter((prevFilter) => {
      return {
        ...prevFilter,
        [event.target.name]: event.target.value
      }
    });
  };

  // const setRules = () => {
  //   console.log('set rules on twitter');
  //   return axios.post('/api/rules', {data: filter})
  //   .then((result) => {
  //     return result;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   })
  // };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log('handle form submit');
    axios.post('/api/tweets', {data: filter})
    .then((response) => {
      console.log(response)

      if (!response.data.data) {
        setStreams((prevStream) => {
          console.log(prevStream);
          return {
            ...prevStream,
            [response.data.params]: [{text: 'No Tweets available for this query'}]
          }
        })
      } else {
        const tweetBucket = response.data.data;
        // setStreams((prevStream) => [...prevStream, tweetBucket]);
        setStreams((prevStream) => {
          console.log(prevStream);
          return {
            ...prevStream,
            [response.data.params]: tweetBucket
          }
        })
      }
      setPrevFilter(response.data.params);
      setFilter({from: '', to: '', mentions: '', hashtag: '', contains: '', retweets: ''});

    })
    .catch((error) => {
      console.error(error);
    })
  };

  return (
    <AppStyles>
      <TweetStreamerTitle>Tweet Streamer</TweetStreamerTitle>
      <div>
        <InputFormTitle>Input Search Parameters</InputFormTitle>
      </div>
      <InputForm filter={filter} formSubmitHandler={formSubmitHandler} handleFormChange={handleFormChange}/>
      <TweetFeed streams={streams}/>
    </AppStyles>
  );
};

export default TweetStreamer;
