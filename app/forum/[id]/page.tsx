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
        <div className="min-h-screen flex flex-col font-['Open_Sans'] overflow-x-hidden">
            <Header />
            <main className="flex-grow w-full min-h-[60vh] flex flex-col items-center py-10 bg-[#f3f3f3] conic-mesh-bg">
                
                {/* Info Bar */}
                <div className="w-[90%] flex flex-row items-center justify-between text-center text-white mb-6">
                    <h1 className="text-xl md:text-2xl font-bold text-black drop-shadow-md bg-white/80 px-4 py-2 rounded">Theme Name: {resolvedParams.id ? `Discussion ${resolvedParams.id}` : '2024 Spanish GP Discussion'}</h1>
                    <Link href="/forum">
                        <button className="bg-[#222] text-white rounded px-5 py-2 font-bold hover:shadow-[0_0_3px_3px_#00b9ff] hover:bg-black transition-all">
                            Back to Forum
                        </button>
                    </Link>
                </div>
                
                {/* Posts Container */}
                <article className="w-full flex flex-col items-center justify-center">
                    {/* Original Post */}
                    <div tabIndex={0} className="w-[90%] border-t-[3px] border-black flex flex-col md:flex-row bg-white transition-all duration-300 hover:shadow-[0_0_3px_3px_#00b9ff] focus:scale-[1.02] focus:shadow-[0_0_3px_3px_#00b9ff] focus:my-5 outline-none mb-4">
                        <div className="w-full md:w-[20%] p-4 flex flex-col items-center justify-center text-center">
                            <h1 className="font-bold text-sm md:text-base break-words">Posted by: {originalPost.author}</h1>
                            <p className="font-bold text-sm md:text-base mt-2 text-gray-600">Posted on: {originalPost.date}</p>
                        </div>
                        <div className="w-full md:w-[80%] flex items-center justify-start text-justify border-t md:border-t-0 md:border-l border-gray-500 px-[3%] py-[5%] text-[1.1em] font-medium tracking-[1px]">
                            <p>{originalPost.content}</p>
                        </div>
                    </div>
                    
                    {/* Comments */}
                    {comments.map(comment => (
                        <div key={comment.id} tabIndex={0} className="w-[90%] border-t-[3px] border-black flex flex-col md:flex-row bg-white transition-all duration-300 hover:shadow-[0_0_3px_3px_#00b9ff] focus:scale-[1.02] focus:shadow-[0_0_3px_3px_#00b9ff] focus:my-5 outline-none mb-4">
                            <div className="w-full md:w-[20%] p-4 flex flex-col items-center justify-center text-center">
                                <h1 className="font-bold text-sm md:text-base break-words">Posted by: {comment.author}</h1>
                                <p className="font-bold text-sm md:text-base mt-2 text-gray-600">Posted on: {comment.date}</p>
                            </div>
                            <div className="w-full md:w-[80%] flex items-center justify-start text-justify border-t md:border-t-0 md:border-l border-gray-500 px-[3%] py-[5%] text-[1.1em] font-medium tracking-[1px]">
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </article>
                
                {/* Reply Form */}
                <div className="w-[90%] bg-white p-6 rounded-lg mt-8 mb-4 shadow-lg border-2 border-black">
                    <h2 className="text-2xl font-bold mb-4 font-['Bebas_Neue'] tracking-wider">Leave a Reply</h2>
                    <form onSubmit={handleReplySubmit} className="flex flex-col gap-4">
                        <textarea 
                            className="w-full h-[150px] border-[3px] border-black rounded-[5px] p-[12px] text-base resize-none focus:outline-none focus:shadow-[0_0_3px_3px_#00b9ff] hover:shadow-[0_0_3px_3px_#00b9ff] transition-shadow duration-200 text-[#282828]"
                            placeholder="Write your reply here..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            required
                        />
                        <div className="flex justify-end mt-4">
                            <button 
                                type="submit" 
                                className="bg-black text-white rounded-lg px-8 py-3 font-bold text-lg hover:-translate-y-0.5 hover:shadow-[0_0_3px_3px_#00b9ff] transition-all duration-200 focus:outline-none focus:shadow-[0_0_3px_3px_#00b9ff]"
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
