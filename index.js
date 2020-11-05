const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');

const app = express();
dotenv.config();
const port = process.env.PORT;

axios.defaults.headers.common = {'Authorization' : `Bearer ${process.env.TWITTER_BEARER_TOKEN}`};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'client', 'static')));

app.post('/api/tweets', (req, res) => {
  let twitterRecentSearch = 'https://api.twitter.com/2/tweets/search/recent'
  const customParams = req.body.data;
  let paramsToAdd = [];

  const customParamKeys = Object.keys(customParams);
  for (let i = 0; i < customParamKeys.length; i++) {
    const key = customParamKeys[i];
    const val = customParams[key];
    if (val !== '') {
      if (key === 'mentions') {
        // @
        paramsToAdd.push(`@${val}`);
      } else if (key === 'retweets') {
        // retweets_of
        paramsToAdd.push(`retweets_of:${val}`);
      } else if (key === 'hashtag') {
        // #
        paramsToAdd.push(`#${val}`);
      } else {
        // key:value
        paramsToAdd.push(`${key}:${val}`);
      }
    }
  }

  console.log('params: ' + paramsToAdd);

  if (paramsToAdd.length > 0) {
    paramsToAdd = paramsToAdd.join(' ');
  } else {
    paramsToAdd = 'corgi';
  }

  paramsToAdd = encodeURI(paramsToAdd);

  console.log('query: ' + paramsToAdd);

  const query = twitterRecentSearch + '?query=' + paramsToAdd;

  axios.get(query, {
    params: {
      max_results: 10
    }
  })
  .then((response) => {
    // console.log(response)
    console.log(response.data);

    let responseWithParams = response.data;
    responseWithParams['params'] = paramsToAdd;
    res.send(responseWithParams);
  }).catch((error) => {
    console.error(error);
  });

})



// FOR STREAM
// app.get('/api/tweets', (req, res) => {
//   // console.log(req);
//   // console.log(req.query);
//   axios.get('https://api.twitter.com/2/tweets/search/stream')
//   .then((response) => {
//     res.send(response);
//   })

//   res.send("something");
// })
// app.post('/api/rules', (req, res) => {
//   // console.log(req.body);

//   // get all rules
//   // remove all rules
//   // set new rules
//   const twitterUrl = 'https://api.twitter.com/2/tweets/search/stream/rules';
//   const rulesToAdd = req.body.data;
//   console.log(rulesToAdd);

//   const newRules = []

//   const ruleParams = Object.keys(rulesToAdd);

//   for (let i = 0; i < ruleParams.length; i++) {
//     const key = ruleParams[i];
//     const val = rulesToAdd[key]
//     if (val !== '') {
//       if (key === 'username') {
//         newRules.push({
//           'value': `@${val}`,
//           'tag': `${i}`
//         })
//       } else if (key === 'retweet') {
//         newRules.push({
//           'value': `retweets_of:${val}`,
//           'tag': `${i}`
//         })
//       } else if (key === 'hashtag') {
//         newRules.push({
//           'value': `#${val}`,
//           'tag': `${i}`
//         })
//       }
//     }
//   }

//   if (newRules.length === 0) {
//     res.send('No new rules');
//     return;
//   }

//   axios.get(twitterUrl)
//   .then((rules) => {
//     let oldRuleIds = [];
//     if (rules.data.data && rules.data.data.length > 0) {
//       rules.data.data.forEach((rule) => {
//         oldRuleIds.push(rule.id);
//       })

//       axios.post(twitterUrl, {'delete': {'ids': oldRuleIds}})
//       .then((removed) => {
//         console.log('rules deleted!');
//         axios.post(twitterUrl, {'add': newRules})
//         .then((added) => {
//           console.log('rules added!');
//           res.send('rules set!');
//         }).catch((error) => {
//           console.error(error);
//         })
//       })
//       .catch((error) => {
//         console.error(error);
//       })
//     } else {
//       axios.post(twitterUrl, {'add': newRules})
//       .then((added) => {
//         console.log('rules added!');
//         res.send('rules set!');
//       }).catch((error) => {
//         console.error(error);
//       })
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   })
// })

app.listen(port, () => { console.log(`listening on port ${port}`); });