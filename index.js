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

//app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'client', 'static', 'index.html')); });

app.post('/api/tweets', (req, res) => {
  // console.log(req);
  // console.log(req.query);;
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
      } else if (key === 'retweet') {
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

  console.log('query: ' + twitterRecentSearch);

  axios.get(twitterRecentSearch, {
    params: {
      query: paramsToAdd,
      max_results: 10
    }
  })
  .then((response) => {
    console.log(response.data);

    let responseWithParams = response.data;
    responseWithParams['params'] = paramsToAdd;
    res.send(responseWithParams);
  }).catch((error) => {
    console.error(error);
  });

})

// {
//   "data": [
//     {
//       "id":"1323646013106581504","text":"【バーチャル・VTuber】#P2y\nホロライブ 白上フブキ VTuber史上5人目のYouTubeチャンネル登録者数100万人に迫る\n#hololive #ShirakamiFubuki #VTuber\n#ホロライブ #白上フブキ #フブキch\nhttps://t.co/z9UrczoR1T"
//     },
//     {
//       "id":"1322926802994606080","text":"Unfinished art of Fubuki doing 3 stand rushes at the same time\n\n#fubuki #shirakamifubuki #jojo #JoJosBizarreAdventure #hololive #hololivefanart https://t.co/4LjKQzcQCL"
//     },
//     {
//       "id":"1322525652797607936","text":"RT @shirosefang: Hololife#1 featuring @shirakamifubuki!\n\n#絵フブキ #hololive #shirakamifubuki https://t.co/y1Qv2oqVyX"
//     },
//     {
//       "id":"1322237493207584768","text":"A message from your friendly neighborhood fox:\n\n#hololive #白上フブキ #ShirakamiFubuki #vtuber #VTubers #JustShutupAndWatchIt\n\nhttps://t.co/AMFk5qJBoy"
//     },
//     {
//       "id":"1321865814849527809","text":"RT @Frankpined93: Why does Fubuki not want to be your wife?\n\n#絵フブキ \n#ShirakamiFubuki\n#Hololive\n#holomemes https://t.co/QBjfNlHDg2"
//     },
//     {
//       "id":"1321334203280023553","text":"Callback to her DKC2 stream from last month, but Fubuki talks a little bit about taking it slow. Sometimes, it's better to do things at your own pace and not worry about others!\n\nLink below ⬇️\nhttps://t.co/XSkaeeqOse\n\n#フブ切り #ShirakamiFubuki #VTuberEN"
//     }
//   ],
//   "meta": {
//     "newest_id":"1323646013106581504","oldest_id":"1321334203280023553","result_count":6
//   }
// }

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