import NotSupport from './page/NotSupport'
import { useState } from 'react'
import AppRoute from './Route/AppRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [widthScreen, setWidthScreen] = useState(true)

  return (
    <>
      {/* <NotServe /> */}
      <ToastContainer />
      <NotSupport widthScreen={widthScreen} setWidthScreen={setWidthScreen}/>
      <AppRoute widthScreen={widthScreen}/>
    </>
  )
}

export default App;
