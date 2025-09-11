import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

export default function ChatWindow({ posts }) {
    return (
        <div className="flex flex-col h-screen bg-[#313338]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {posts.map((post, index) => (
                    <motion.div
                        key={index}
                        className="bg-[#2b2d31] p-4 rounded-lg shadow border border-[#202225]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <h2 className="text-white text-xl font-semibold mb-2">
                            {post.title}
                        </h2>
                        <p className="text-gray-300 whitespace-pre-line mb-3">
                            {post.content}
                        </p>

                        {/* GitHub 링크가 여러 개인 경우 배열로 렌더링 */}
                        {post.github && post.github.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-2">
                                {post.github.map((linkObj, i) => (
                                    <a
                                        key={i}
                                        href={linkObj.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-[#1e1f22] text-gray-200 px-3 py-1 rounded hover:bg-[#5865f2] hover:text-white transition"
                                    >
                                        <FaGithub />
                                        {linkObj.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
