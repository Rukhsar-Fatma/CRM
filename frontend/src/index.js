import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster 
        reverseOrder={false}
        position="bottom-left" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>, document.getElementById('root'));

serviceWorker.unregister();