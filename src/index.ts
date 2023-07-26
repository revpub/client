import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/.env' });

const ACTIVITY_PUB = {
  POTENTIAL_ACCEPT_HEADERS: [
    'application/activity+json',
    'application/ld+json',
    'application/ld+json; profile="https://www.w3.org/ns/activitystreams"'
  ],
  ACCEPT_HEADER: 'application/activity+json, application/ld+json',
  PUBLIC: 'https://www.w3.org/ns/activitystreams#Public',
};

console.log('Client running.')

function createItem() {
    // 👇️ const data: Product
    axios.post(
      'http://' + process.env.CDS_HOST + ':' + process.env.OUTBOX_PORT + '/outbox',
      {
        "@context": ["https://www.w3.org/ns/activitystreams",
                     {"@language": "en"}],
        "type": "Create",
        "actor": 'https://' + process.env.CDS_HOST + '/alyssa/',
        "to": 'http://' + process.env.CDS_HOST + ':' + process.env.OUTBOX_PORT + '/outbox',
        "object": {
          "@context": {"@language": "en"},
          "type": "Item",
          "attributedTo": 'https://' + process.env.CDS_HOST + '/alyssa/',
          "content": "This is an item"
        }
      },
      {
        headers: {
          'Host': process.env.CDS_HOST,
          'Content-Type': 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
          'accept': ACTIVITY_PUB.ACCEPT_HEADER
        }
      }
    ).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

createItem();
