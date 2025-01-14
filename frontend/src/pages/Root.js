import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation'

function RootLayout(){
	
	// hook that lets us know if were in a transition
	// const navigation = useNavigation();
	// navigation.state === 'idle', 'loading', or 'submitting'
	
	return <>
		<MainNavigation />
		<main>
			 {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
			<Outlet />
		</main>
	</>
}

export default RootLayout;