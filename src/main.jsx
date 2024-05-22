import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './styles/style.css';
import './styles/icon_style.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import store from './store/index';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ThemeProvider from './themes/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider>
          <ToastContainer />
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
