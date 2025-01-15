// import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

import classes from './EventsList.module.css';

function EventsList({ events }) {

  // RR makes loader data available in sibling and children routes
  // but not parents routes; can use in components used
  // in an element assigned to a route (children)
  // const events = useLoaderData();

  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            <Link to={event.id}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
