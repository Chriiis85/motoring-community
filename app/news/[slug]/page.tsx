'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Link from 'next/link';

interface Article {
  title: string;
  author: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
  description: string;
  content: string;
  source: {
    name: string;
  };
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = React.use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        
        if (data.articles) {
          // Function to generate slug identically to how it was created
          const getSlug = (title: string) => {
            return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          };

          const foundArticle = data.articles.find((a: Article) => getSlug(a.title) === unwrappedParams.slug);
          
          if (foundArticle) {
            setArticle(foundArticle);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [unwrappedParams.slug]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col font-['F1Regular'] bg-[#1a1a1a]">
        <Header variant="main" />
        <main className="flex-grow w-full py-12 px-4 md:px-8 text-white relative z-10 pt-20">
          <article className="max-w-[1000px] mx-auto bg-[#222] p-8 md:p-16 rounded-xl border-t-4 border-t-[#00b9ff]/40 shadow-2xl animate-pulse">
            <div className="w-28 h-4 bg-gray-700 rounded mb-8"></div>
            <div className="flex flex-col items-center mb-10 gap-4">
              <div className="w-24 h-6 bg-gray-700 rounded"></div>
              <div className="w-4/5 h-10 md:h-14 bg-gray-700 rounded"></div>
              <div className="w-2/3 h-8 bg-gray-700/60 rounded"></div>
              <div className="w-48 h-4 bg-gray-700/40 rounded mt-4"></div>
            </div>
            <div className="space-y-4 pt-6">
              <div className="w-full h-5 bg-gray-700/70 rounded"></div>
              <div className="w-full h-5 bg-gray-700/70 rounded"></div>
              <div className="w-5/6 h-5 bg-gray-700/60 rounded"></div>
              <div className="w-full h-5 bg-gray-700/50 rounded pt-4"></div>
              <div className="w-3/4 h-5 bg-gray-700/50 rounded"></div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col font-['F1Regular'] bg-[#1a1a1a]">
        <Header variant="main" />
        <main className="flex-grow flex flex-col items-center justify-center text-white gap-6">
          <h2 className="text-3xl font-['F1RegularBold']">Article Not Found</h2>
          <p className="text-gray-400">The article you are looking for might have been removed or does not exist.</p>
          <Link href="/news" className="bg-[#00b9ff] text-black px-6 py-2 rounded font-bold hover:bg-white transition-colors">
            Back to News
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Clean up content from NewsAPI (remove the [+xxxx chars] at the end)
  const cleanContent = article.content ? article.content.replace(/\[\+\d+ chars\]$/, '') : '';

  return (
    <div className="min-h-screen flex flex-col font-['F1Regular'] bg-[#1a1a1a]">
      <Header
        variant="page"
        pageTitle="LATEST NEWS"
        backgroundImage={article.urlToImage}
      />
      
      <main className="flex-grow w-full py-12 px-4 md:px-8 text-white relative z-10 pt-20">
        <article className="max-w-[1000px] mx-auto bg-[#222] p-8 md:p-16 rounded-xl border-t-4 border-t-[#00b9ff] shadow-2xl relative -mt-32">
          
          <div className="mb-8 flex justify-start">
            <Link href="/news" className="inline-flex items-center text-gray-400 hover:text-[#00b9ff] transition-colors font-['F1RegularBold'] text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              BACK TO NEWS
            </Link>
          </div>

          <div className="mb-10 text-center">
            <span className="inline-block bg-[#00b9ff] text-black text-xs font-['F1RegularBold'] uppercase px-3 py-1 rounded mb-6">
              {article.source?.name || 'F1 News'}
            </span>
            <h1 className="text-3xl md:text-5xl font-['F1RegularBold'] mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-sm text-gray-400 font-['F1Regular'] border-y border-gray-700 py-4">
              <span>By <strong className="text-white">{article.author || 'F1 Staff'}</strong></span>
              <span className="hidden md:inline">•</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-gray-300 font-medium mb-8 leading-relaxed">
              {article.description}
            </p>
            
            {cleanContent && (
              <p className="text-gray-400 leading-relaxed mb-8">
                {cleanContent}
              </p>
            )}
            
            <div className="bg-[#111] p-6 rounded-lg border border-gray-700 mt-12 text-center">
              <h3 className="text-xl font-['F1RegularBold'] mb-4">Continue Reading</h3>
              <p className="text-gray-400 mb-6 text-sm">
                This is a preview. To read the full original article, please visit the source publication.
              </p>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[#00b9ff] text-black px-8 py-3 rounded font-['F1RegularBold'] hover:bg-white transition-colors"
              >
                READ ORIGINAL ARTICLE
              </a>
            </div>
          </div>
          
        </article>
      </main>
      
      <ScrollToTop />
      <Footer />
    </div>
  );
}
