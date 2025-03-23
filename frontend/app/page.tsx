const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-300 text-gray-800">
      <header className="text-white p-6">
        <h1 className="text-3xl font-bold">Welcome to the World of Weather!</h1>
      </header>
      <main className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <p className="mb-4">
            On our site, you will find current weather forecasts, detailed
            analytics, and interactive maps that help you stay informed about
            weather conditions in your region and beyond.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Current forecasts</li>
            <li>Interactive maps</li>
            <li>User-friendly interface</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Benefits:</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Accurate data</li>
            <li>Easy to use</li>
            <li>Support for various regions</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Get Started:</h2>
          <p className="mb-4">
            Sign up today and gain access to personalized forecasts!
          </p>
          <a
            href="/analytics"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Analytics
          </a>
        </section>
      </main>
    </div>
  );
};

export default Home;
