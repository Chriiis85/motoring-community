'use client';

import React, { useState, FormEvent } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { use } from 'react';
import ScrollToTop from '@/components/ui/ScrollToTop';

interface Post {
    id: number;
    author: string;
    date: string;
    content: string;
}

export default function ForumPostDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const originalPost: Post = {
        id: 1,
        author: 'krizm',
        date: '2024-05-10',
        content: 'Hello everyone, I just wanted to discuss the latest race and get some thoughts on the current standings. Do you think the recent upgrades will make a difference?'
    };

    const initialComments: Post[] = [
        { id: 2, author: 'f1fan99', date: '2024-05-10', content: 'Great race indeed! The new aero package looks promising.' },
        { id: 3, author: 'maxlover', date: '2024-05-11', content: 'Red Bull dominating again, but McLaren is catching up quickly.' },
        { id: 4, author: 'leclerc16', date: '2024-05-11', content: 'Ferrari needs better strategy if they want to secure second place in the constructors.' },
    ];

    const [comments, setComments] = useState<Post[]>(initialComments);
    const [replyText, setReplyText] = useState('');

    const handleReplySubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const newComment: Post = {
            id: Date.now(),
            author: 'CurrentUser', // Mocked current user
            date: new Date().toISOString().split('T')[0],
            content: replyText.trim()
        };

        setComments([...comments, newComment]);
        setReplyText('');
    };

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#f3f3f3] dark:bg-[#121212] transition-colors duration-300">
            <Header />
            <main className="flex-grow w-full min-h-[60vh] flex flex-col items-center pt-[150px] md:pt-[180px] pb-10 conic-mesh-bg">
                
                {/* Alert Message */}
                <div className="w-[90%] max-w-5xl bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-amber-900 dark:text-amber-300 p-4 mb-6 rounded shadow-sm text-center" role="alert">
                  <p className="font-bold">⚠️ Aviso / Warning</p>
                  <p>Esta sección es solo una demostración visual y actualmente no tiene funcionalidad real.</p>
                </div>

                {/* Info Bar */}
                <div className="w-[90%] max-w-5xl flex flex-row items-center justify-between text-center text-white mb-6">
                    <h1 className="text-base sm:text-xl md:text-2xl font-bold text-black dark:text-white drop-shadow-md bg-white/90 dark:bg-[#1e1e1e]/90 border border-transparent dark:border-gray-700 px-4 py-2 rounded">Theme: {resolvedParams.id ? `Discussion #${resolvedParams.id}` : '2024 Spanish GP Discussion'}</h1>
                    <Link href="/forum">
                        <button className="bg-[#222] dark:bg-[#00b9ff] text-white dark:text-black rounded px-5 py-2 font-bold hover:shadow-[0_0_3px_3px_#00b9ff] hover:bg-black dark:hover:bg-white transition-all">
                            Back to Forum
                        </button>
                    </Link>
                </div>
                
                {/* Posts Container */}
                <article className="w-full flex flex-col items-center justify-center">
                    {/* Original Post */}
                    <div tabIndex={0} className="w-[90%] max-w-5xl border-t-[3px] border-black dark:border-[#00b9ff] flex flex-col md:flex-row bg-white dark:bg-[#1e1e1e] text-black dark:text-gray-100 transition-all duration-300 hover:shadow-[0_0_3px_3px_#00b9ff] focus:scale-[1.02] focus:shadow-[0_0_3px_3px_#00b9ff] focus:my-5 outline-none mb-4 rounded-b-md shadow-md">
                        <div className="w-full md:w-[20%] p-4 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-[#252528] md:bg-transparent">
                            <h1 className="font-bold text-sm md:text-base break-words text-black dark:text-white">Posted by: {originalPost.author}</h1>
                            <p className="font-semibold text-xs md:text-sm mt-2 text-gray-500 dark:text-gray-400">{originalPost.date}</p>
                        </div>
                        <div className="w-full md:w-[80%] flex items-center justify-start text-justify border-t md:border-t-0 md:border-l border-gray-300 dark:border-gray-700 px-[3%] py-[4%] text-[1.05em] font-normal tracking-[0.5px]">
                            <p className="text-gray-800 dark:text-gray-200">{originalPost.content}</p>
                        </div>
                    </div>
                    
                    {/* Comments */}
                    {comments.map(comment => (
                        <div key={comment.id} tabIndex={0} className="w-[90%] max-w-5xl border-t-[3px] border-black dark:border-[#00b9ff] flex flex-col md:flex-row bg-white dark:bg-[#1e1e1e] text-black dark:text-gray-100 transition-all duration-300 hover:shadow-[0_0_3px_3px_#00b9ff] focus:scale-[1.02] focus:shadow-[0_0_3px_3px_#00b9ff] focus:my-5 outline-none mb-4 rounded-b-md shadow-md">
                            <div className="w-full md:w-[20%] p-4 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-[#252528] md:bg-transparent">
                                <h1 className="font-bold text-sm md:text-base break-words text-black dark:text-white">Posted by: {comment.author}</h1>
                                <p className="font-semibold text-xs md:text-sm mt-2 text-gray-500 dark:text-gray-400">{comment.date}</p>
                            </div>
                            <div className="w-full md:w-[80%] flex items-center justify-start text-justify border-t md:border-t-0 md:border-l border-gray-300 dark:border-gray-700 px-[3%] py-[4%] text-[1.05em] font-normal tracking-[0.5px]">
                                <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </article>
                
                {/* Reply Form */}
                <div className="w-[90%] max-w-5xl bg-white dark:bg-[#1e1e1e] p-6 rounded-lg mt-8 mb-4 shadow-lg border-2 border-black dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-f1-title)] tracking-wider text-black dark:text-white">Leave a Reply</h2>
                    <form onSubmit={handleReplySubmit} className="flex flex-col gap-4">
                        <textarea 
                            className="w-full h-[150px] border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#2a2a2e] text-black dark:text-white rounded-[5px] p-[12px] text-base resize-none focus:outline-none focus:border-[#00b9ff] focus:shadow-[0_0_3px_3px_#00b9ff] transition-all duration-200 placeholder:text-gray-400"
                            placeholder="Write your reply here..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            required
                        />
                        <div className="flex justify-end mt-4">
                            <button 
                                type="submit" 
                                className="bg-black dark:bg-[#00b9ff] text-white dark:text-black rounded-lg px-8 py-3 font-bold text-lg hover:-translate-y-0.5 hover:shadow-[0_0_3px_3px_#00b9ff] transition-all duration-200 focus:outline-none focus:shadow-[0_0_3px_3px_#00b9ff]"
                            >
                                Post Reply
                            </button>
                        </div>
                    </form>
                </div>

            </main>
            <ScrollToTop />
            <Footer />
        </div>
    );
}
