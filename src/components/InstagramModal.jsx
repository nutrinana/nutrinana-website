"use client";

import React, { useRef } from "react";
import { SiInstagram } from "react-icons/si";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

export default function InstagramModal({ post, onClose, onNext, onPrev, showNav }) {
  const modalRef = useRef(null);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      }}
    >
      <div ref={modalRef} className="bg-white rounded-lg overflow-hidden w-full max-w-6xl flex flex-col md:flex-row shadow-lg">
        {/* Left/right nav buttons */}
        {showNav && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 text-white text-2xl px-2 py-1 bg-black/30 rounded-full hover:bg-black"
              aria-label="Previous post"
            >
              ‹
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 text-white text-2xl px-2 py-1 bg-black/30 rounded-full hover:bg-black"
              aria-label="Next post"
            >
              ›
            </button>
          </>
        )}

        {/* Left: Image */}
        <div className="flex-shrink-0 w-full md:w-1/2 bg-black">
          <img
            src={post.media_url}
            alt={post.caption || 'Instagram post'}
            className="w-full h-full object-cover max-h-[80vh]"
          />
        </div>

        {/* Right: Caption */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 mr-4">
                <SiInstagram className="w-5 h-5 text-black" />
              </div>
              <p className="text-lg font-semibold text-black">nutrinanaa</p>
            </div>
            <hr className="border-t border-gray-200 w-[calc(100%+3rem)] -ml-6 mb-8" />
            <p className="text-gray-700 whitespace-pre-line text-base mb-4">
              {post.caption?.split(/(\s+)/).map((word, index) => {
                if (word.startsWith('@') || word.startsWith('#')) {
                  const match = word.match(/^([@#][\w_-]+(?:\.[\w_-]+)*)([^\w]*)$/);
                  if (match) {
                    return (
                      <React.Fragment key={index}>
                        <span className="text-blue-500">{match[1]}</span>
                        {match[2]}
                      </React.Fragment>
                    );
                  }
                }
                return word;
              })}
            </p>
            <p className="text-sm text-gray-500 mb-8">{formatDate(post.timestamp)}</p>
          </div>
          {post.permalink && (
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              View on Instagram →
            </a>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 text-black hover:text-white hover:bg-transparent"
      >
        <X size={28} />
      </Button>
    </div>
  );
}
