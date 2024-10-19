import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Landing from './pages/landing/Landing'
import AuthPage from './pages/landing/auth/AuthPage'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App