import HeroVideo from '../components/HeroVideo';

const HomePage = () => {
  return (
    <main>
      <HeroVideo />
      <section className="py-10">
        <h1 className="text-4xl font-bold">Welcome to Juzumo</h1>
        <p className="mt-4 text-lg">
          Your one-stop solution for all your needs. Explore our services and offerings.
        </p>
      </section>
    </main>
  );
};

export default HomePage;