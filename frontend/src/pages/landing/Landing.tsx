import bgImage from '../../assets/bgimage.jpg';
import Header from './Header';

const Landing = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-cover w-full h-screen flex flex-col"
    >
      <Header />

      <section className="hero flex flex-col justify-center items-center text-center w-full h-full">
        <h1 className="text-5xl font-bold p-4 text-300 w-3/5 ">
          Healthy Cooking Recipes and the Right Nutrition
        </h1>
        <p className="text-xl p-2 text-300">
          Browse Through Over 800,000 Tasty Recipes
        </p>
        <button className="cta bg-100 mt-5 p-4 rounded-md">
          More Recipes
        </button>
      </section>


      <section className='featured-recipes w-full h-full'>
        <h2 className='text-2xl text-300'>Featured Recipes</h2>
        <div className='grid grid-rows-2'>
            
        </div>
      </section>

      
    </div>
  );
};

export default Landing;
