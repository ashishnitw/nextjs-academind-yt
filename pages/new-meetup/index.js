import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

export default function NewMeetup() {
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData) {
        // or use axios
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
    };
    return (
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    )
}