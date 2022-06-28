//  /api/new-meetup

import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const meetup = req.body;

        const client = await MongoClient.connect("mongodb+srv://awais:donlyawais@cluster0.bkx35.mongodb.net/meetups?retryWrites=true&w=majority");
        
        const db = client.db();

        const meetupCollection = db.collection('meetups');

        const result = await meetupCollection.insertOne(meetup);
    
        client.close();

        res.status(201).json({
            message: 'Meetup created successfully'
        });
    }
}

export default handler;