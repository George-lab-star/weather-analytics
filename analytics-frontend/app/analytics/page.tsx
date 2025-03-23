"use client";

import Map from "@/components/Map";

const Analytics: React.FC = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-blue-500 to-blue-300 flex justify-center">
        <div className="text-gray-800">
          <header className="text-white p-6">
            <h1 className="text-3xl font-bold">
              Explore Weather with Our Interactive Map!
            </h1>
          </header>
          <main className="flex flex-col justify-center w-[90vw] p-[3vh] bg-white rounded-lg shadow-lg">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Map Description:</h2>
              <p className="mb-4">
                Our weather map allows you to visualize current conditions and
                forecasts. Simply select your region of interest to get a
                complete picture of the weather.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">Available Data:</h2>
              <ul className="list-disc list-inside mb-4">
                <li>Temperature</li>
                <li>Precipitation</li>
                <li>Wind</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">Analysis Features:</h2>
              <p className="mb-4">
                Compare current data with forecasts and see how the weather will
                change in the coming days.
              </p>
            </section>
            <section className="mt-6">
              <h2 className="text-xl font-semibold mb-2">
                Interactive Weather Map:
              </h2>
              <Map />
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default Analytics;
