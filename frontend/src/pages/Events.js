
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