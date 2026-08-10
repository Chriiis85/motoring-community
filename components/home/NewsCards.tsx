'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Article {
  title: string;
  author: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
}

export default function NewsCards() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        if (data.articles && data.articles.length >= 4) {
          const validArticles = data.articles.filter((a: Article) => a.urlToImage && !a.title.includes('[Removed]'));
          setArticles(validArticles.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, url: string) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      window.location.href = url;
    }
  };

  const getSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="latest-news-container w-full flex items-center justify-center flex-col py-8">
      <h1 className="m-0 mt-[3%] text-[2.5em] font-['F1RegularBold']">FORMULA ONE NEWS</h1>
      <article className="latest-news w-[90%] max-w-[1400px] flex items-center justify-center font-['F1Regular'] flex-col">
        <div className="latest-news-notice w-full flex items-center justify-around flex-row mt-[3%] mb-[3%]">
          
          {/* Main Large Card */}
          <div 
            tabIndex={13} 
            className="latest-news-notice1 relative w-[45%] h-[600px] flex items-center justify-end flex-col transition-all duration-300 ease-in-out bg-cover bg-center overflow-hidden bg-black cursor-pointer hover:scale-[0.97] group border-b-4 border-b-[#00b9ff] rounded"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)),url('${articles[0].urlToImage}')`
            }}
            onClick={() => window.location.href = `/news/${getSlug(articles[0].title)}`}
            onKeyDown={(e) => handleKeyDown(e, `/news/${getSlug(articles[0].title)}`)}
          >
            {/* Read More Hover Element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00b9ff] text-white font-['F1RegularBold'] px-6 py-3 rounded-full z-20">
              READ STORY
            </div>
            
            <div className="latest-news-notice1-info relative z-10 w-[90%] h-[40%] flex flex-col justify-end text-white mb-[2%]">
              <h1 className="text-2xl mb-2 group-hover:text-[#00b9ff] transition-colors">{articles[0].title}</h1>
              <p className="text-gray-400 font-['F1RegularBold'] text-sm">By {articles[0].author || 'F1 News'} | {formatDate(articles[0].publishedAt)}</p>
            </div>
          </div>

          <div className="latest-news-notice2 w-[45%] h-[600px] flex flex-col justify-between">
            {/* Medium Top Card */}
            <div 
              tabIndex={14} 
              className="latest-news-notice3 relative w-full h-[48%] flex items-center justify-end flex-col transition-all duration-300 ease-in-out bg-cover bg-center overflow-hidden bg-black cursor-pointer hover:scale-[0.97] group border-b-4 border-b-[#00b9ff] rounded"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)),url('${articles[1].urlToImage}')`
              }}
              onClick={() => window.location.href = `/news/${getSlug(articles[1].title)}`}
              onKeyDown={(e) => handleKeyDown(e, `/news/${getSlug(articles[1].title)}`)}
            >
              {/* Read More Hover Element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00b9ff] text-white text-sm font-['F1RegularBold'] px-4 py-2 rounded-full z-20">
                READ STORY
              </div>

              <div className="latest-news-notice3-info relative z-10 w-[90%] h-[50%] flex flex-col justify-end text-white mb-[3%]">
                <h1 className="text-xl mb-2 group-hover:text-[#00b9ff] transition-colors">{articles[1].title}</h1>
                <p className="text-gray-400 font-['F1RegularBold'] text-xs">By {articles[1].author || 'F1 News'} | {formatDate(articles[1].publishedAt)}</p>
              </div>
            </div>

            <div className="latest-news-notice4 w-full h-[48%] flex flex-row justify-between">
              {/* Small Bottom Left Card */}
              <div 
                tabIndex={15} 
                className="latest-news-notice5 relative w-[48%] h-full flex items-center justify-end flex-col transition-all duration-300 ease-in-out bg-cover bg-center overflow-hidden bg-black cursor-pointer hover:scale-[0.97] group border-b-4 border-b-[#00b9ff] rounded"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)),url('${articles[2].urlToImage}')`
                }}
                onClick={() => window.location.href = `/news/${getSlug(articles[2].title)}`}
                onKeyDown={(e) => handleKeyDown(e, `/news/${getSlug(articles[2].title)}`)}
              >
                {/* Read More Hover Element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00b9ff] text-white text-xs font-['F1RegularBold'] px-3 py-1 rounded-full z-20">
                  READ STORY
                </div>

                <div className="latest-news-notice4-info relative z-10 w-[90%] h-[60%] flex flex-col justify-end text-white mb-[5%]">
                  <h1 className="text-sm mb-1 group-hover:text-[#00b9ff] transition-colors line-clamp-2">{articles[2].title}</h1>
                  <p className="text-gray-400 font-['F1RegularBold'] text-[10px] uppercase">By {articles[2].author || 'F1 News'} · {formatDate(articles[2].publishedAt)}</p>
                </div>
              </div>
              
              {/* Small Bottom Right Card */}
              <div 
                tabIndex={16} 
                className="latest-news-notice6 relative w-[48%] h-full flex items-center justify-end flex-col transition-all duration-300 ease-in-out bg-cover bg-center overflow-hidden bg-black cursor-pointer hover:scale-[0.97] group border-b-4 border-b-[#00b9ff] rounded"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)),url('${articles[3].urlToImage}')`
                }}
                onClick={() => window.location.href = `/news/${getSlug(articles[3].title)}`}
                onKeyDown={(e) => handleKeyDown(e, `/news/${getSlug(articles[3].title)}`)}
              >
                {/* Read More Hover Element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00b9ff] text-white text-xs font-['F1RegularBold'] px-3 py-1 rounded-full z-20">
                  READ STORY
                </div>

                <div className="latest-news-notice4-info relative z-10 w-[90%] h-[60%] flex flex-col justify-end text-white mb-[5%]">
                  <h1 className="text-sm mb-1 group-hover:text-[#00b9ff] transition-colors line-clamp-2">{articles[3].title}</h1>
                  <p className="text-gray-400 font-['F1RegularBold'] text-[10px] uppercase">By {articles[3].author || 'F1 News'} · {formatDate(articles[3].publishedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      <div className="mt-8">
        <Link href="/news" className="group relative bg-[#222] text-white px-10 py-4 font-['F1RegularBold'] text-xl rounded flex items-center gap-4 hover:bg-[#00b9ff] hover:text-black border-2 border-[#00b9ff] transition-all duration-300">
          <span className="text-white relative z-10">VIEW ALL F1 NEWS</span>
          <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </Link>
      </div>
    </section>
  );
}
