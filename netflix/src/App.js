import './App.css';
import requests from './requests';
import Row from './Row';

function App() {
  return (
		<div className='App'>
      <Row title="NETFLIX ORIGNALS" fetchUrl={requests.fetchNetflixOriginals}/>
      <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
		</div>
	);
}

export default App;
