import { useRouteLoaderData, redirect } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage(){
	const data = useRouteLoaderData('event-detail');
	
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