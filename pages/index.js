//domain/

import Head from 'next/head';

//if import is part of getStaticProps or getSerSideProps it will not be a part of bundle         
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList'; 
import { Fragment } from 'react';

function HomePage(props) {
    return <Fragment>
        <Head>
            <title>Home</title>
            <meta name="description"
            content="This is the home page of the meetup app" />
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>
}

//only be created in pages
//can be async

//this will run on server after deployment
//cant set revalidate because it will run on every request
// export async function getServerSideProps(context){
//     //const {req, res} = context;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

//reserved name, if nextjs finds it renders during pre-rendering process
//this code never executes on client side
//it executes during built process
export async function getStaticProps() {
    //always need to return an object
    //revalidate get seconds of what it will wait for before rendering

    const client = await MongoClient.connect("mongodb+srv://awais:donlyawais@cluster0.bkx35.mongodb.net/meetups?retryWrites=true&w=majority");

    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    }
}

export default HomePage;