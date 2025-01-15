import { redirect } from 'react-router-dom';

import EventForm from "../components/EventForm";

function NewEventPage(){
	
	return <EventForm />
}

export default NewEventPage;

export async function action({request, params}){
	// gives resturns data object including form data
	const data = await request.formData();

	const eventData = {
		title: data.get('title'),
		image: data.get('image'),
		description: data.get('description'),
		date: data.get('date')
	};

	const response = await fetch('http://localhost:8080/events', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(eventData)
	})

	if (!response.ok){
		throw new Response(JSON.stringify({
			message: 'Could not save event'
		}), {status: 500});
	} else {
		// must return somthing in action
		return redirect('/events')
	}
}