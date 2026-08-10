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
          <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-5xl bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded shadow-sm text-center" role="alert">
            <p className="font-bold">⚠️ Aviso / Warning</p>
            <p>Esta sección es solo una demostración visual y actualmente no tiene funcionalidad real.</p>
          </div>

          {/* Main Bar */}
          <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-5xl h-[75px] flex flex-row items-center justify-center bg-white shadow-md rounded-[10px] mb-6">
            
            <div className="w-[30%] h-full flex items-center justify-center pl-[2%]">
              <div className="w-[70%] relative group">
                <select className="appearance-none w-full text-base py-[0.675em] pr-[2em] pl-[1em] bg-white border border-[#caced1] rounded-[0.25rem] text-black cursor-pointer hover:shadow-[0_0_3px_3px_#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] focus:outline-none transition-shadow">
                  <option value="Default">Default</option>
                  <option value="Popularity">Popularity</option>
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div className="w-[50%] h-full flex items-center justify-center">
              <div className="relative flex items-center w-[90%] h-[50px]">
                <svg className="absolute left-4 fill-[#9e9ea7] w-4 h-4" aria-hidden="true" viewBox="0 0 24 24">
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
                <input 
                  id="search" 
                  placeholder="Search" 
                  type="search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-full py-0 pr-4 pl-10 border-2 border-transparent rounded-lg outline-none bg-[#f3f3f4] text-[#0d0c22] text-base transition-all duration-300 placeholder:text-[#9e9ea7] hover:border-cyan hover:bg-white hover:shadow-[0_0_0_4px_rgba(0,185,255,0.1)] focus:border-cyan focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,185,255,0.1)]" 
                />
              </div>
            </div>

            <div className="w-[30%] h-full flex items-center justify-center pr-[2%]">
              <button 
                onClick={handleNewTheme}
                className="w-[60%] min-h-[44px] bg-[#222] text-white rounded font-bold text-base px-5 py-[9px] hover:bg-black hover:shadow-[0_0_3px_3px_#00b9ff] focus:bg-black focus:shadow-[0_0_3px_3px_#00b9ff] transition-all outline-none"
              >
                Add new Theme
              </button>
            </div>
            
          </div>

          <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-5xl flex items-center justify-around flex-row text-center text-lg text-white mb-4">
            <h1 className="bg-black/60 px-4 py-1 rounded">Order by: Default</h1>
            <h1 className="bg-black/60 px-4 py-1 rounded">Showing {mockPosts.length} posts</h1>
          </div>

          {/* Posts List */}
          <div className="w-full flex flex-col items-center justify-center">
            {mockPosts.map((post) => (
              <div key={post.id} className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-5xl h-[200px] mb-[3%] flex items-center justify-center group">
                <Link href={`/forum/${post.id}`} className="w-full h-full flex flex-row bg-white rounded-[5px] border border-gray-400 shadow-md transition-all duration-300 hover:shadow-[0_0_3px_3px_#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] focus:outline-none focus:scale-[1.02] hover:scale-[1.01]">
                  
                  {/* Post Card 1: Author & Date */}
                  <div className="w-[25%] h-[98%] my-auto flex flex-col items-center justify-evenly text-center border-r border-gray-400 overflow-hidden">
                    <h1 className="w-[90%] px-[10px] font-bold truncate text-black">Posted by: {post.author}</h1>
                    <p className="px-[3%] text-sm text-gray-600">Posted on: <br/>{post.date}</p>
                  </div>

                  {/* Post Card 2: Main Content */}
                  <div className="w-[75%] h-full flex flex-col">
                    
                    {/* Post Card 3: Title */}
                    <div className="w-full h-[30%] flex items-center justify-start border-b border-gray-400">
                      <h1 className="m-0 pl-[3%] font-bold text-xl truncate text-black">{post.title}</h1>
                    </div>

                    {/* Post Card 4: Content & Info */}
                    <div className="w-full h-[70%] flex flex-row items-center justify-center">
                      
                      {/* Post Card 5: Last Post Snippet */}
                      <div className="w-[80%] h-full flex items-center justify-center text-justify border-r border-gray-400">
                        <p className="w-[90%] max-h-[80%] flex items-start justify-center overflow-hidden font-medium tracking-[1px] text-gray-700">
                          {post.lastPost}
                        </p>
                      </div>

                      {/* Post Card 6: Stats */}
                      <div className="w-[20%] h-full flex flex-col items-center justify-around">
                        <div className="w-full h-full flex flex-row items-center justify-around">
                          <div className="w-[80%] h-[70%] flex flex-col items-center justify-center text-center">
                            <svg className="w-6 h-6 mb-1 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                            </svg>
                            <p className="m-0 text-sm font-bold text-black">Posts: {post.postCount}</p>
                          </div>
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
