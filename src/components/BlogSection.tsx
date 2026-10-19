import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { BookOpen, Clock, User, ArrowRight, X, Share2, Tag } from 'lucide-react';

interface BlogSectionProps {
  posts?: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const displayPosts = posts && posts.length > 0 ? posts : BLOG_POSTS;

  return (
    <section id="blog" className="py-20 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-xs font-bold text-[#FF7A00] uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bitácora & Guías Técnicas RTM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
            Secretos del <span className="text-[#7CFF00]">Río Paraná</span> y la Montaña
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Artículos escritos por guías de pesca matriculados e instructores de outdoor con experiencia real en el terreno.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group flex flex-col rounded-2xl bg-[#141414] border border-neutral-800 hover:border-[#7CFF00] overflow-hidden transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(124,255,0,0.15)]"
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/80 text-[#7CFF00] border border-neutral-700 backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FF7A00]" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#7CFF00] transition-colors line-clamp-2 leading-snug font-heading">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-[#7CFF00] transition-colors flex items-center gap-1">
                    Leer artículo completo
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#7CFF00] transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Reader Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl bg-[#121212] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="relative aspect-video sm:aspect-[21/9] w-full bg-neutral-900 shrink-0">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-neutral-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#7CFF00] text-black">
                    {selectedPost.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 leading-tight font-heading">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-neutral-800 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#FF7A00]" />
                    <span className="text-white font-medium">{selectedPost.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>

                {/* Article Prose */}
                <div className="prose prose-invert max-w-none text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </div>

                {/* Tags */}
                <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-neutral-400" />
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
