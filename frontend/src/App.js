import NotSupport from './page/NotSupport'
import { useEffect, useState } from 'react'
import AppRoute from './Route/AppRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [widthScreen, setWidthScreen] = useState(null)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    width < 350 ? setWidthScreen(false) : setWidthScreen(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      width < 350 ? setWidthScreen(false) : setWidthScreen(true)
    }
    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
  }, [width])

  return (
    <>
      <ToastContainer />
      {widthScreen ? <AppRoute />: <NotSupport />}
    </>
  )
}

export default App
