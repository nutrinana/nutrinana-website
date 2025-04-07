"use client";

import React from "react";

export default function InstagramModal({ post, onClose, onNext, onPrev, showNav }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="flex-1 bg-black aspect-w-1 aspect-h-1">
          <img
            src={post.media_url}
            alt={post.caption || "Instagram post"}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>

        {/* Right: Caption */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-2"></div>
            <div>
              <p className="text-gray-800 font-semibold">{post.username}</p>
              <p className="text-gray-500 text-sm">{post.timestamp}</p>
            </div>
          </div>
          <div className="overflow-y-auto max-h-[70vh]">
            <p className="text-gray-800 text-sm whitespace-pre-line">{post.caption}</p>
          </div>
          <div className="text-gray-500 text-sm mt-2">
            {post.hashtags.map((hashtag, index) => (
              <span key={index} className="mr-1">#{hashtag}</span>
            ))}
          </div>
          <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 hover:underline text-sm"
          >
            View on Instagram →
          </a>
        </div>
      </div>

      {/* Navigation Buttons */}
      {showNav && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl px-3 py-2 bg-black/50 rounded-full hover:bg-black"
            aria-label="Previous post"
          >
            ‹
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl px-3 py-2 bg-black/50 rounded-full hover:bg-black"
            aria-label="Next post"
          >
            ›
          </button>
        </>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl px-3 py-1 bg-black/50 rounded hover:bg-black"
        aria-label="Close modal"
      >
        ✕
      </button>
    </div>
  );
}
