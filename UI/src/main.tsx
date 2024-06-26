// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';
// import { RouterProvider } from 'react-router-dom';
// import appRouter from './router/userRouter.tsx';
// import { store, persistor } from './utils/context/store.tsx';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { Toaster } from 'sonner';
// import Profile from './Components/Profile/Profile.tsx';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Toaster
//         toastOptions={{
//           unstyled: true,
//           classNames: {
//             error: 'text-red-600 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
//             success: 'text-green-600 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
//             warning: 'text-gray-300 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
//             info: 'text-black text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
//           },
//         }}
//       />
//       <PersistGate loading={null} persistor={persistor}>
//         <RouterProvider router={appRouter} />
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>,
// );



import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import appRouter from './router/userRouter.tsx';
import { store, persistor } from './utils/context/store.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            error: 'text-red-600 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
            success: 'text-green-600 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
            warning: 'text-gray-300 text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
            info: 'text-black text-xs flex justify-start border border-rounded gap-3 w-80 px-4 py-5 bg-white rounded-md',
          },
        }}
      />
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter}>
          <App />
        </RouterProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

