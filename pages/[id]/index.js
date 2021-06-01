import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail'

const DB_URL = 'mongodb+srv://shopifydba:shopifydba@test0.skmm7.mongodb.net/meetups?retryWrites=true&w=majority';

export default function MeetupDetailPage(props) {
    
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />)
}

export async function getStaticProps(ctx) {
    
    const id = ctx.params.id;
    // fetch data with this id
    const client = await MongoClient.connect(DB_URL);
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetup = await meetupsCollection.findOne({_id: ObjectId(id)});

    console.log("MEETUP DETAIL =====> ", meetup);

    client.close();

    return {
        props: {
            meetupData: {
                title: meetup.title,
                description: meetup.description,
                image: meetup.image,
                address: meetup.address
            }
        }
    }
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(DB_URL);
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();
    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({params: {id: meetup._id.toString()}}))
    }
}