"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/waitlist', { email });
      setMessage("thanks for joining our waitlist! we'll keep you updated on probe-blocks");
      // setName('');
      setEmail('');
    } catch (error) {
      setMessage('an error occurred. please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-blue-900 rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-2 text-center text-white-800">join probe-blocks waitlist</h1>
        <p className="text-center text-white-600 mb-6">be the first to access smart crypto investing insights</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">name</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div> */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white-700">email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          >
            join waitlist
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm font-medium text-green-600">{message}</p>}
      </div>
      <div className="mt-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">why choose probe-blocks?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <h3 className="font-bold mb-2">smart insights</h3>
            <p>ai-powered analysis for informed crypto decisions</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <h3 className="font-bold mb-2">real-time data</h3>
            <p>up-to-the-minute wallet tracking information</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <h3 className="font-bold mb-2">user-friendly</h3>
            <p>intuitive interface for beginners and experts alike</p>
          </div>
        </div>
      </div>
    </main>
  );
}