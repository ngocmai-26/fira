import logo from './logo.svg';
import './App.css';
import "./index.css";
import Login from './container/auth/login';
import Register from './container/auth/register';
import Router from './routes';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './slices/AuthSlice';
import '../src/asset/css/tailwind.css'
import "@fontsource/be-vietnam-pro"; 

function App() {
  const { refresh, logged } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(loadUser());
  }, [refresh]);
  return (
    <Router/>
  );
}

export default App;
