import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from 'react-redux'
import store from './utils/store'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {
  const [count, setCount] = useState(0)


  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainContainer />,
        },
        {
          path: "watch",
          element: <WatchPage />,
        },
        {
          path: "demo",
          element: (
            <>
              <Demo />
              <Demo2 />
            </>
          ),
        },
      ],
    },
  ]);
  return (
    <>
    <Provider store={store}>
    <div>
     
        <RouterProvider router={appRouter} />

        
      </div>
    </Provider>


    </>
  )
}

export default App
