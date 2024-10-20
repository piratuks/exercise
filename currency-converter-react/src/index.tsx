import { App } from 'app/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'state/configureStore';
import reportWebVitals from './reportWebVitals';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

async function enableMocking() {
  if (process.env.REACT_APP_ENABLE_MOCKS === 'true') {
    const { worker } = await import('./mocks/browser');

    return worker.start();
  }

  return;
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );

  reportWebVitals();
});
