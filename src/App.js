
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Main from './components/layout/Main';
import Login from './components/Login';
import Register from './components/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Register></Register>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/home',
        element: <Home></Home>
      }
    ]
  }
])
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
