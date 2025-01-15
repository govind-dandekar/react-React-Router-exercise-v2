import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const fetcher = useFetcher();
	//to interact with action or loader w/o route change, use fetcher
	const { data, state } = fetcher;

	useEffect(() => {
		if (state === 'idle' && data && data.message){
			window.alert(data.message);
		}
	}, [data, state])
	
	// fetcher.Form triggers an action but does not initialize
	// a route transition to the page that the loader or 
	// action belongs to
	return (
    <fetcher.Form 
			method="post" 
			// trigger newsletter action
			action="/newsletter"
			className={classes.newsletter}
		>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;