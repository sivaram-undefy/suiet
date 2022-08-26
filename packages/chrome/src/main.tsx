import React from 'react'
import ReactDOM from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import {Provider} from 'react-redux'
import {persistorStore, store} from "./store";
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MemoryRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistorStore}>
          <App />
        </PersistGate>
      </Provider>
    </MemoryRouter>
  </React.StrictMode>
)
