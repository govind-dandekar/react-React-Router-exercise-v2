import { 
  useNavigate, 
  Form, 
  useNavigation, 
  useActionData, 
  redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  // gives data returned by closest action
  // response automatically parsed
  const data = useActionData();
  
  const navigate = useNavigate();
  const navigation = useNavigation();

  // state of currently active transition from form submit
  const isSubmitting = (navigation.state === 'submitting');

  function cancelHandler() {
    navigate('..');
  }

  // Form 'post' request sent to action fx
  // can send form data to different route by setting action attr
  return (
    <Form method={method} className={classes.form}>
      { data && data.errors && <ul>
        {/* Object.values will loop over Object keys */}
        {Object.values(data.errors).map(err => <li key={err}>
          {err}
        </li>)}  
      </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input 
          id="title" 
          type="text" 
          name="title" 
          required 
          defaultValue={event ? event.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input 
          id="image" 
          type="url" 
          name="image" 
          required 
          defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input 
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          name="description" 
          rows="5" 
          required
          defaultValue={event ? event.description : ''}  
        />
      </p>
      <div className={classes.actions}>
        <button 
          type="button" 
          onClick={cancelHandler}
          disabled={isSubmitting}  
        >
          Cancel
        </button>
        <button 
          disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({request, params}){
	const method = request.method;
  
  // gives resturns data object including form data
	const data = await request.formData();

	const eventData = {
		title: data.get('title'),
		image: data.get('image'),
		description: data.get('description'),
		date: data.get('date')
	};

  let url = 'http://localhost:8080/events';

  if (method === 'PATCH'){
    url = url + '/' + params.id;
  }

	const response = await fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(eventData)
	})

	if (response.status === 422){
		// returning response received from backend
		// can use returned action data - common
		// for validation errors
		return response;
	}

	if (!response.ok){
		throw new Response(JSON.stringify({
			message: 'Could not save event'
		}), {status: 500});
	} else {
		// must return somthing in action
		return redirect('/events')
	}
}
