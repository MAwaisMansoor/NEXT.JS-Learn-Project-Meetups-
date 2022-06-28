//domain/new-meetup

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
    const router = useRouter();

    const addMeetupHandler = async (meetup) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meetup)
        });

        const data = await response.json();

        router.push('/');
    }

    return <Fragment>
        <Head>
            <title>Add New Meetup</title>
            <meta name="description"
                content="Add new meetups!" />
        </Head>
        <h1>Add New Meetup!</h1>
        <NewMeetupForm
            onAddMeetup={addMeetupHandler}
        />
    </Fragment>
}

export default NewMeetup;