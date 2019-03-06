const fs = require('fs');
const followPath =
  './bundles/digitallymarked-layouts/stream-assets/streamlabs-db/most_recent_follower.txt';
const subPath =
  './bundles/digitallymarked-layouts/stream-assets/streamlabs-db/most_recent_subscriber.txt';

module.exports = nodecg => {
  const streamLabsDB = nodecg.Replicant('streamLabsDB');
  let follower, subscriber;

  // Follower change
  setInterval(() => {
    fs.readFile(followPath, 'utf-8', (err, data) => {
      follower = data;
    });
  }, 1000);

  setInterval(() => {
    fs.readFile(subPath, 'utf-8', (err, data) => {
      subscriber = data;
    });
  }, 1000);


  setInterval(() => {
    streamLabsDB.value = {
      follow: follower,
      sub: subscriber,
    };
  }, 1000)

};
