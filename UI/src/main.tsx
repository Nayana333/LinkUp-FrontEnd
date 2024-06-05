import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import appRouter from './router/userRouter.tsx'
import { store, persistor } from './utils/context/store.tsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter}>
          <App />
        </RouterProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

