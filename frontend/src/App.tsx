import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Landing from './pages/landing/Landing'
import AuthPage from './pages/landing/auth/AuthPage'
import Recipes from './pages/landing/recipe/Recipes'
import RecipeDetails from './pages/landing/recipe/RecipeDetails'
import AboutUs from './pages/AboutUs'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/recipes" element={<Recipes/>}/>
        <Route path="/recipe/:id" element={<RecipeDetails/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App