import { Suspense } from 'react'

// gives access to closest loader data
import { useLoaderData, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
	// RR resolves Promise to returned data
	// with deferral, returns Obj with events key
	const {events} = useLoaderData();
	
	// Await will wait for data to resolve
	// once promise resolves, callback fx will run
	// Suspense used to show fallback while waiting for data
	// to arrive
  return <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
		<Await resolve={events}>
			{(loadedEvents) => <EventsList events={loadedEvents} />}
		</Await>
	</Suspense>
}

export default EventsPage;


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

// loader called once page starts to load; 
// data fetching initiated once route transition started
// RR will wait for loader to finish before page
// rendered;  data will be there once page is rendered
// dont need loading state but can cause loading delays
// CANNOT USE REACT HOOKS IN LOADER (NOT A REACT COMPONENT)
export function loader() {
	return {
		// execute loadEvents -- returned Promise
		// will be stored in an Obj under the events key
    events: loadEvents(),
  };
}