import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, AlertTriangle, Loader, Search } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Access the API key from environment variables
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          toast.success('Current location detected!');
        },
        (error) => {
          console.warn('Could not get user location:', error.message);
          toast('Using default location (Bangalore). You can search.', { icon: 'ℹ️' });
          setLocationCoords({ lat: 12.9716, lon: 77.5946 }); // Default to Bangalore
        }
      );
    } else {
      toast('Geolocation is not supported by this browser.', { icon: '⚠️' });
      setLocationCoords({ lat: 12.9716, lon: 77.5946 });
    }
  }, []);

  useEffect(() => {
    if (!API_KEY) {
        setError("Weather API key is missing. Please create a .env file and add REACT_APP_WEATHER_API_KEY.");
        setLoading(false);
        return;
    }
    if (!locationCoords) return;


    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      setWeatherData(null);
      setForecast(null);
      setAlerts(null);
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${locationCoords.lat},${locationCoords.lon}&days=7&aqi=no&alerts=yes`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error.message || `API Error: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData({
          temp: data.current.temp_c,
          description: data.current.condition.text,
          icon: data.current.condition.icon,
          humidity: data.current.humidity,
          wind_speed: data.current.wind_kph / 3.6, // Convert kph to m/s
          city: data.location.name,
          region: data.location.region,
        });
        setForecast(data.forecast.forecastday);
        setAlerts(data.alerts.alert);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [locationCoords, API_KEY]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return toast.error('Please enter a location.');

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) {
        throw new Error('Failed to search location.');
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setLocationCoords({ lat: data[0].lat, lon: data[0].lon });
        toast.success(`Location set to ${data[0].name}`);
        setSearchQuery('');
      } else {
        toast.error('Location not found.');
        setLoading(false);
      }
    } catch (err) {
      toast.error(`Search failed: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-4 sm:p-6 w-full min-h-screen font-sans">
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Weather Dashboard</h2>

            <form onSubmit={handleSearch} className="flex gap-2">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a city..."
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
            <button
                type="submit"
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                disabled={loading}
            >
                <Search className="w-5 h-5" />
            </button>
            </form>

            {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[30rem] text-center">
                <Loader className="w-10 h-10 text-gray-400 animate-spin mb-4" />
                <p className="text-gray-600 text-lg">Fetching weather data...</p>
            </div>
            ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[30rem] text-center text-red-600 bg-red-50 rounded-lg p-8">
                <AlertTriangle className="w-12 h-12 mb-4" />
                <p className="font-bold text-xl">An Error Occurred</p>
                <p className="text-md mt-2">{error}</p>
            </div>
            ) : weatherData ? (
            <div className="space-y-8">
                {/* Current Weather */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-5">
                        <img src={weatherData.icon} alt={weatherData.description} className="w-20 h-20" />
                        <div>
                            <p className="text-5xl font-bold text-gray-800">{Math.round(weatherData.temp)}°C</p>
                            <p className="text-gray-600 text-lg capitalize">{weatherData.description}</p>
                        </div>
                        </div>
                        <div className="text-center sm:text-right">
                            <p className="text-2xl font-semibold text-gray-800">{weatherData.city}</p>
                            <p className="text-md text-gray-500">{weatherData.region}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-base text-gray-600 mt-6 pt-6 border-t">
                        <p className="flex items-center gap-3">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Humidity:</span> {weatherData.humidity}%
                        </p>
                        <p className="flex items-center gap-3">
                        <Wind className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">Wind:</span> {Math.round(weatherData.wind_speed)} m/s
                        </p>
                    </div>
                </div>

                {/* Alerts Section */}
                {alerts && alerts.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Active Alerts</h3>
                    {alerts.map((alert, index) => (
                    <div key={index} className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-r-lg shadow-sm">
                        <div className="flex items-start">
                        <AlertTriangle className="w-6 h-6 mr-4 flex-shrink-0 mt-1" />
                        <div>
                            <p className="font-bold text-lg">{alert.headline}</p>
                            <p className="text-md mt-1">{alert.event}</p>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                )}

                {/* 7-Day Forecast Section */}
                {forecast && forecast.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">7-Day Forecast</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                    {forecast.map((day) => (
                        <div key={day.date_epoch} className="text-center bg-gray-50 p-4 rounded-lg border border-gray-200 transition-shadow hover:shadow-md">
                        <p className="font-bold text-md">
                            {new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <img
                            src={day.day.condition.icon}
                            alt={day.day.condition.text}
                            className="w-16 h-16 mx-auto my-2"
                        />
                        <p className="text-lg font-bold text-gray-800">
                            {Math.round(day.day.maxtemp_c)}°
                        </p>
                        <p className="text-sm text-gray-500">
                            {Math.round(day.day.mintemp_c)}°
                        </p>
                        </div>
                    ))}
                    </div>
                </div>
                )}
            </div>
            ) : null}
        </div>
      </div>
    </>
  );
};

export default WeatherDashboard;
