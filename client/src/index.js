import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import "./axiosConfig.js"
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import StateContext from './context/stateContext.js';
import "../src/interceptors/authInterceptor.js"

const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      retry:0,
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateContext>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ToastContainer 
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newsOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

          </QueryClientProvider>
        </AuthProvider>
      </StateContext>
    </BrowserRouter>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

