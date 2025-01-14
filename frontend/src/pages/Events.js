// gives access to closest loader data
import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
	// RR resolves Promise to returned data
	const events = useLoaderData();
	
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

// loader called once page starts to load; 
// data fetching initiated once route transition started
// RR will wait for loader to finish before page
// rendered;  data will be there once page is rendered
// dont need loading state but can cause loading delays
export async function loader() {
	const response = await fetch('http://localhost:8080/events');

	if (!response.ok) {
		//...
	} else {
		const resData = await response.json();
		// RR makes returned data available
		return resData.events;
	}
}