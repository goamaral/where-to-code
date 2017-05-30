import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

export default class App extends Component {
	render() {
		return (
			<Provider store={createStore(reducers)}>
				<div>
					<Home />
				</div>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
