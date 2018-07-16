/*var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'mNsqrdVWhHfTlBjf8BYbnqzrZ',
  consumer_secret: 'bsxKZn6LuavT5MvDBbpdhlzSjoYBxhEvXDrdNtqxf87ZU4Cs09',
  access_token_key: '1018249414765416448-T4yhiovvYWpVVaoV5EmQX3a5mo0s1a',
  access_token_secret: 'ZM5QNLeCRtZJOWPCOXddpHONMa4qAyI0GWV66LlaMTQJm',
});


module.exports = client;
*/
console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};


