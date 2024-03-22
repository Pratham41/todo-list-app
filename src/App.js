import './App.css';
import Header from './components/Header';
import AddTodo from './pages/AddTodo';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    }, {
      path: "/add",
      element: <AddTodo />
    }
  ])
  return (
    <div className="App">
      <Header />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
