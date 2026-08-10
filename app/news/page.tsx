'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import ScrollToTop from '@/components/ui/ScrollToTop';

interface Article {
  title: string;
  author: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
  description: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        if (data.articles) {
          const validArticles = data.articles.filter((a: Article) => a.urlToImage && !a.title.includes('[Removed]'));
          setArticles(validArticles); 
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1, visibleCount);

  return (
    <div className="min-h-screen flex flex-col font-['F1Regular'] bg-[#1a1a1a]">
      <Header
        variant="page"
        pageTitle="F1 Latest News"
        backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk5GbJoGeA2Tg0ts8w5duFeSfneOHy8eHHEAOSuazCCTuxfbrPR5zrMjo&s=10"
      />
      <main className="flex-grow w-full py-12 px-4 md:px-8 text-white">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <div className="w-full flex justify-center py-20">
              <h2 className="text-2xl font-['F1Regular']">Loading Latest News...</h2>
            </div>
          ) : articles.length === 0 ? (
            <div className="w-full flex justify-center py-20">
              <h2 className="text-2xl font-['F1Regular']">No news found at the moment.</h2>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {/* Featured Article */}
              {featuredArticle && (
                <Link 
                  href={`/news/${getSlug(featuredArticle.title)}`}
                  className="group relative w-full h-[500px] flex items-end overflow-hidden rounded-xl border-2 border-transparent hover:border-[#00b9ff] transition-all duration-300 shadow-2xl"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${featuredArticle.urlToImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  
                  {/* Read More Hover Element */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00b9ff] text-white font-['F1RegularBold'] px-6 py-3 rounded-full z-20">
                    READ STORY
                  </div>
                  <div className="relative z-10 p-8 md:p-12 w-full md:w-3/4">
                    <span className="inline-block bg-[#00b9ff] text-black text-xs font-['F1RegularBold'] uppercase px-3 py-1 rounded mb-4">
                      Featured
                    </span>
                    <span className="text-[#00b9ff] text-sm font-['F1RegularBold'] uppercase ml-4">
                      {formatDate(featuredArticle.publishedAt)}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-['F1RegularBold'] mb-4 group-hover:text-[#00b9ff] transition-colors leading-tight">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-300 text-base md:text-lg line-clamp-2 mb-4 font-['F1Regular']">
                      {featuredArticle.description}
                    </p>
                    <div className="text-sm text-gray-400 uppercase font-['F1RegularBold']">
                      By {featuredArticle.author || 'F1 News'}
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid Articles */}
              {gridArticles.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {gridArticles.map((article, i) => (
                      <Link 
                        key={i} 
                        href={`/news/${getSlug(article.title)}`}
                        className="group flex flex-col bg-[#222] border-t-4 border-t-[#00b9ff] rounded-b-lg overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,185,255,0.2)] transition-all duration-300"
                      >
                        <div className="relative w-full h-[250px] overflow-hidden bg-black">
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            style={{ backgroundImage: `url('${article.urlToImage}')` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#222] via-transparent to-transparent" />
                          {/* Read More Hover Element */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00b9ff] text-white text-sm font-['F1RegularBold'] px-4 py-2 rounded-full z-20">
                            READ STORY
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <span className="text-[#00b9ff] text-xs font-['F1RegularBold'] uppercase mb-2">
                            {formatDate(article.publishedAt)}
                          </span>
                          <h2 className="text-xl font-['F1Regular'] mb-3 group-hover:text-[#00b9ff] transition-colors line-clamp-3">
                            {article.title}
                          </h2>
                          <p className="text-gray-400 text-sm flex-grow line-clamp-3 mb-4 font-['F1Regular']">
                            {article.description || 'Click to read the full story...'}
                          </p>
                          <div className="text-xs text-gray-500 uppercase font-['F1RegularBold'] border-t border-gray-700 pt-3">
                            Source: {article.author || 'F1 News'}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                
                {visibleCount < articles.length && (
                  <div className="w-full flex justify-center mt-12">
                    <button 
                      onClick={() => setVisibleCount(v => v + 9)}
                      className="bg-[#222] text-white px-8 py-3 font-['F1RegularBold'] text-lg rounded border border-[#00b9ff] hover:bg-[#00b9ff] hover:text-black transition-all duration-300"
                    >
                      LOAD MORE NEWS
                    </button>
                  </div>
                )}
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
