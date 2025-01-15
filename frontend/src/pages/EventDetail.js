import { useLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage(){
	const data = useLoaderData();
	
	return <>
		<EventItem 
			event={data.event}
		/>
	</>
}

export default EventDetailPage;

// RR passes object to loader fx
// contains req obj and params
export async function loader({request, params}){

	const id = params.id

	const response = await fetch('http://localhost:8080/events/' + id);

	if (!response.ok){
		throw new Response(JSON.stringify({
			message: 'Could not fetch details for selected event'
		}), {status: 500})
	} else {
		return response;
	}
}