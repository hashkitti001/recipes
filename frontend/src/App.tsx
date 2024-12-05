import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from './components/Loader'
// Lazy-loaded components
const Landing = lazy(() => import("./pages/landing/Landing"));
const AuthPage = lazy(() => import("./pages/landing/auth/AuthPage"));
const Recipes = lazy(() => import("./pages/landing/recipe/Recipes"));
const RecipeDetails = lazy(() => import("./pages/landing/recipe/RecipeDetails"));
const AboutUs = lazy(() => import("./pages/AboutUs"));


const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
