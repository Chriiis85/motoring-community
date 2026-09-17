'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

// Mock data for the forum posts
const mockPosts = [
  {
    id: '1',
    author: 'admin',
    date: '2024-05-12 14:32:00',
    title: 'Welcome to the Motoring Community Forum!',
    lastPost: 'Please read the rules before posting. We hope you enjoy your stay!',
    postCount: 42,
  },
  {
    id: '2',
    author: 'F1Fanatic',
    date: '2024-05-14 09:15:00',
    title: 'Thoughts on the new technical regulations?',
    lastPost: 'I think the new aero package is going to completely change the dynamic of high-speed corners...',
    postCount: 128,
  },
  {
    id: '3',
    author: 'SpeedDemon',
    date: '2024-05-15 18:45:00',
    title: 'Monaco GP Predictions',
    lastPost: 'Who do you think will take pole this weekend? My bet is on Max, but Charles might surprise us.',
    postCount: 56,
  },
  {
    id: '4',
    author: 'TechHead',
    date: '2024-05-16 11:20:00',
    title: 'Engine reliability issues for Ferrari?',
    lastPost: 'Looking at the telemetry from FP2, there seems to be some clipping on the straights.',
    postCount: 89,
  },
  {
    id: '5',
    author: 'AeroGuru',
    date: '2024-05-18 20:10:00',
    title: 'Mercedes sidepod updates explained',
    lastPost: 'The new sidepod geometry appears to be optimizing the airflow towards the rear wing...',
    postCount: 204,
  }
];

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleNewTheme = () => {
    alert("New Post creation is not available in the mock version.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-light">
      <Header />
      
      <main className="flex flex-col items-center justify-start min-h-[60vh] w-full bg-[#f3f3f3] conic-mesh-bg pt-[150px] md:pt-[180px] pb-12">
        <article className="w-full pt-[3%] pb-[3%] flex flex-col items-center justify-center">
          
          {/* Alert Message */}
          <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-5xl bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-amber-900 dark:text-amber-300 p-4 mb-6 rounded shadow-sm text-center" role="alert">
            <p className="font-bold">⚠️ Aviso / Warning</p>
            <p>Esta sección es solo una demostración visual y actualmente no tiene funcionalidad real.</p>
          </div>

          {/* Main Bar */}
          <div className="w-[92%] md:w-[85%] lg:w-[70%] xl:w-[60%] max-w-5xl flex flex-col md:flex-row items-center justify-between bg-white dark:bg-[#1e1e1e] shadow-md rounded-[10px] mb-6 p-4 gap-3 border border-transparent dark:border-gray-800">
            
            <div className="w-full md:w-[25%] flex items-center justify-center">
              <div className="w-full relative group">
                <select 
                  aria-label="Order forum posts by"
                  className="appearance-none w-full text-sm md:text-base py-2.5 pr-8 pl-3 bg-white dark:bg-[#2c2c30] border border-[#caced1] dark:border-gray-700 rounded text-black dark:text-white cursor-pointer hover:shadow-[0_0_3px_3px_#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] focus:outline-none transition-shadow"
                >
                  <option value="Default" className="bg-white dark:bg-[#222] text-black dark:text-white">Default</option>
                  <option value="Popularity" className="bg-white dark:bg-[#222] text-black dark:text-white">Popularity</option>
                  <option value="Newest" className="bg-white dark:bg-[#222] text-black dark:text-white">Newest</option>
                  <option value="Oldest" className="bg-white dark:bg-[#222] text-black dark:text-white">Oldest</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700 dark:text-gray-300">
                  <svg aria-hidden="true" className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[50%] flex items-center justify-center">
              <div className="relative flex items-center w-full h-[45px]">
                <svg aria-hidden="true" className="absolute left-3 fill-[#9e9ea7] w-4 h-4" viewBox="0 0 24 24">
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
                <input 
                  id="search" 
                  aria-label="Search forum posts"
                  placeholder="Search forum..." 
                  type="search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-full py-0 pr-4 pl-9 border-2 border-transparent rounded-lg outline-none bg-[#f3f3f4] dark:bg-[#2c2c30] text-[#0d0c22] dark:text-white text-sm md:text-base transition-all duration-300 placeholder:text-[#9e9ea7] hover:border-cyan hover:bg-white dark:hover:bg-[#2c2c30] hover:shadow-[0_0_0_4px_rgba(0,185,255,0.1)] focus:border-cyan focus:bg-white dark:focus:bg-[#2c2c30] focus:shadow-[0_0_0_4px_rgba(0,185,255,0.1)]" 
                />
              </div>
            </div>

            <div className="w-full md:w-[25%] flex items-center justify-center">
              <button 
                type="button"
                onClick={handleNewTheme}
                aria-label="Create a new forum theme"
                className="w-full min-h-[44px] bg-[#222] dark:bg-[#00b9ff] text-white dark:text-black rounded font-bold text-sm md:text-base px-4 py-2.5 hover:bg-black dark:hover:bg-white hover:shadow-[0_0_3px_3px_#00b9ff] transition-all outline-none cursor-pointer"
              >
                Add new Theme
              </button>
            </div>
            
          </div>

          <div className="w-[92%] md:w-[85%] lg:w-[70%] xl:w-[60%] max-w-5xl flex items-center justify-between flex-row text-center text-xs sm:text-sm text-white mb-4">
            <span className="bg-black/60 px-3 py-1 rounded font-semibold">Order by: Default</span>
            <span className="bg-black/60 px-3 py-1 rounded font-semibold">Showing {mockPosts.length} posts</span>
          </div>

          {/* Posts List */}
          <div className="w-full flex flex-col items-center justify-center px-3">
            {mockPosts.map((post) => (
              <div key={post.id} className="w-full md:w-[85%] lg:w-[70%] xl:w-[60%] max-w-5xl min-h-[160px] md:h-[200px] mb-4 flex items-center justify-center group">
                <Link href={`/forum/${post.id}`} aria-label={`Forum post: ${post.title} by ${post.author}`} className="w-full h-full flex flex-col sm:flex-row bg-white dark:bg-[#1e1e1e] rounded-[8px] border border-gray-400 dark:border-gray-700 shadow-md transition-all duration-300 hover:shadow-[0_0_3px_3px_#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] focus:outline-none focus:scale-[1.01] hover:scale-[1.01] overflow-hidden">
                  
                  {/* Post Card 1: Author & Date */}
                  <div className="w-full sm:w-[25%] p-3 sm:p-0 sm:h-full flex flex-row sm:flex-col items-center justify-between sm:justify-evenly text-center bg-gray-50 dark:bg-[#252528] sm:bg-transparent border-b sm:border-b-0 sm:border-r border-gray-300 dark:border-gray-700">
                    <span className="font-bold text-xs sm:text-sm truncate text-black dark:text-white">Posted by: {post.author}</span>
                    <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">{post.date}</p>
                  </div>

                  {/* Post Card 2: Main Content */}
                  <div className="w-full sm:w-[75%] flex flex-col flex-grow">
                    
                    {/* Post Card 3: Title */}
                    <div className="w-full p-3 sm:py-2.5 sm:px-4 flex items-center justify-start border-b border-gray-200 dark:border-gray-700">
                      <h2 className="m-0 font-bold text-base sm:text-lg md:text-xl text-black dark:text-white line-clamp-1">{post.title}</h2>
                    </div>

                    {/* Post Card 4: Content & Info */}
                    <div className="w-full p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-grow">
                      
                      {/* Post Card 5: Last Post Snippet */}
                      <div className="w-full sm:w-[80%] flex items-center text-left">
                        <p className="text-xs sm:text-sm line-clamp-2 md:line-clamp-3 font-medium text-gray-700 dark:text-gray-300">
                          {post.lastPost}
                        </p>
                      </div>

                      {/* Post Card 6: Stats */}
                      <div className="w-full sm:w-[20%] sm:border-l sm:border-gray-200 dark:sm:border-gray-700 flex items-center justify-start sm:justify-center sm:pl-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-300">
                          <svg className="w-4 h-4 text-[#00b9ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                          </svg>
                          <span>{post.postCount}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </Link>
              </div>
            ))}
          </div>

        </article>
      </main>
      
      <ScrollToTop />
      <Footer />
    </div>
  );
}
