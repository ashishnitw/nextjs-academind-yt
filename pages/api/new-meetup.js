import { MongoClient } from 'mongodb';

const DB_URL = 'mongodb+srv://shopifydba:shopifydba@test0.skmm7.mongodb.net/meetups?retryWrites=true&w=majority';

export default async function handler (req, res) {
    if (req.method == 'POST') {
        const client = await MongoClient.connect(DB_URL);
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        
        await meetupsCollection.insertOne(req.body);
        client.close();
        res.status(201).json({ msg: 'Meetup created' });
    }
}