import { Link, useSubmit } from 'react-router-dom'

import classes from './EventItem.module.css';

function EventItem({ event }) {
  // gives access to a submit fx
  const submit = useSubmit();
  
  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed){

      // submits (data, request) to action
      submit(null, {
        method: 'delete'
        // action: '/a-different-path'
      })
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
