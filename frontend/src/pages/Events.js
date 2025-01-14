import { Link } from 'react-router-dom';

const DUMMY_EVENTS = [
	{id: 1, title: "event #1"},
	{id: 2, title: "event #2"},
	{id: 3, title: "event #3"}
]

function EventsPage(){
	return <>
		<h1>Events</h1>
		<ul>
			{DUMMY_EVENTS.map((evnt) => <li key={evnt.id}>
					<Link to={`${evnt.id}`}>
						{evnt.title}
					</Link>
			</li>)}
		</ul>
	</>
}

export default EventsPage;