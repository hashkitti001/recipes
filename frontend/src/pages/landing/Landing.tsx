import bgImage from '../../assets/bgimage.jpg';
import RecipeItem from '../../components/RecipeItem';
import Header from './Header';
import featuredRecipes from './data';
import ConsentBanner from './ConsentBanner';

const Landing = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover w-full h-screen flex flex-col"
    >
      <Header />

      {/* Hero Section */}
      <section className="hero flex flex-col justify-center items-center text-center w-full h-screen px-4 md:px-8 lg:px-16 my-9 bg-cover bg-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold p-4 text-300 w-full max-w-3xl">
          Healthy Cooking Recipes and the Right Nutrition
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl p-2 text-300 max-w-xl">
          Browse Through Over 800,000 Tasty Recipes
        </p>
        <button className="cta bg-100 text-white mt-5 p-3 md:p-4 rounded-md text-lg">
          More Recipes
        </button>
      </section>

      {/* Featured Recipes Section */}
      <section className='featured-recipes w-full h-full p-5 bg-cover bg-center'>
        <h2 className='text-xl md:text-2xl lg:text-3xl text-300 mb-4 text-center font-bold'>
          Featured Recipes
        </h2>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {featuredRecipes.map((item) => (
            <RecipeItem 
              key={item.name}
              name={item.name}
              duration={item.duration} 
              calories={item.calories} 
              servings={item.servings} 
              imgURL={item.imgURL} 
            />
          ))}
        </div>
      </section>

      <ConsentBanner />
    </div>
  );
};

export default Landing;
