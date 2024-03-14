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

  return (
    <>
    <Provider store={store}>
      <Header></Header>
      <Sidebar></Sidebar>
    <h1 className="text-3xl font-bold underline">

      Hello world!
    </h1>

    </Provider>


    </>
  )
}

export default App
