import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './app/App';
import reportWebVitals from './reportWebVitals';
import { store } from './state/configureStore.ts';

const mockEnabled = import.meta.env.VITE_ENABLE_MOCKS;

const startApp = async () => {
  if (mockEnabled === 'true' || mockEnabled === true) {
    try {
      const { worker } = await import('./mocks/browser');
      await worker.start();
    } catch (err) {
      console.error('Failed to load mocks:', err);
    }
  }

  const root = createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );

  reportWebVitals();
};

startApp();
