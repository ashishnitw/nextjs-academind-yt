import { MongoClient } from 'mongodb'
import Head from 'next/head'
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList'

const DB_URL = 'mongodb+srv://shopifydba:shopifydba@test0.skmm7.mongodb.net/meetups?retryWrites=true&w=majority';

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetup App</title>
        <meta name="description" content="List of highly active react meetups" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export async function getStaticProps() {
  // fetch data from api, database or file system.

  const client = await MongoClient.connect(DB_URL);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const result = await meetupsCollection.find().toArray();

  client.close();

  return {
      props: {
          meetups: result.map(meetup => ({
            title: meetup.title,
            address: meetup.address,
            image: meetup.image,
            id: meetup._id.toString()
          }))
      },
      revalidate: 10
  }
}

// export function getServerSideProps(context) {
//   // after deployment with every request
//   // fetch data from api, database or file system.
//   console.log("INSIDE getServerSideProps() -> ", context.req)
//   return {
//     props: {
//       meetups: MEETUP_LIST
//     }
//   }
// }
