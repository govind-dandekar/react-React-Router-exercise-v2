import { Suspense } from 'react';

import { 
	useRouteLoaderData, 
	redirect, 
	Await } from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetailPage(){
	const {event, events} = useRouteLoaderData('event-detail');
	
	return <>
		<Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
			<Await resolve={event}>
				{(loadedEvent) => <EventItem event={loadedEvent}/>}
			</Await>
		</Suspense>
		<Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
			<Await resolve={events}>
				{(loadedEvents) => <EventsList events={loadedEvents}/>}
			</Await>
		</Suspense>
	</>
}

export default EventDetailPage;

async function loadEvent(id){
	const response = await fetch('http://localhost:8080/events/' + id);

	if (!response.ok){
		throw new Response(JSON.stringify({
			message: 'Could not fetch details for selected event'
		}), {status: 500})
	} else {
		const resData = await response.json();
		return resData.event;
	}
}

async function loadEvents(){
	// fetch returns Promise that resolves to a Response
	// RR supports response objects
	const response = await fetch('http://localhost:8080/events');

	if (!response.ok) {
		// 400 or 500 status
		// return { 
		// 	isError: true, 
		// 	message: 'Could not fetch events'
		// };

		// when Error thrown, RR will render closest errorElement
		throw new Response(JSON.stringify({
			message: 'Could not fetch events'
		}), {status: 500})
	} else {
		// RR makes returned data available
		// can return any kind of data via loader
		// including new Response() on client-side;
		// RR will automatically extract data
		// useLoaderData() automatically gives data that's
		// part of the response
		const resData = await response.json();
		return resData.events;
	}
}

// RR passes object to loader fx
// contains req obj and params
export async function loader({request, params}){
	const id = params.id

	return ({
		// will wait for laodEvent to complete
		// before loading page component 
		event: await loadEvent(id),
		// will loadEvents after page was loaded
		events: loadEvents()
	})
}

export async function action({params, request}){
	const id = params.id;

	const response = await fetch('http://localhost:8080/events/' + id,
		{ method: request.method }
	);

	if (!response.ok){
		throw new Response(JSON.stringify({
			message: 'Could not delete event'
		}), {status: 500})
	} else {
		return redirect('/events')
	}
}

