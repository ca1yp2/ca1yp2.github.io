import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const [homeData, setHomeData] = useState(null);

    useEffect(() => {
        fetch('/data/home.json')
            .then(res => res.json())
            .then(data => setHomeData(data))
            .catch(err => console.error(err));
    }, []);

    if (!homeData) return <div className="text-white p-6">로딩 중...</div>;

    return (
        <div className="flex flex-col bg-[#313338] text-white">
            <main className="flex-1 px-3 md:px-6 py-8 space-y-6">
                {homeData?.messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.6 }}
                    >
                        <img
                            src={homeData?.avatar}
                            alt={`${homeData?.name} avatar`}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-700 flex-shrink-0"
                        />
                        <div>
                            <p className="text-sm md:text-base font-semibold text-gray-300 mb-1">{homeData?.name}</p>

                            <div className="max-w-full md:max-w-md bg-[#5865f2] text-white rounded-lg px-4 py-3 shadow">
                                {/* 일반 텍스트 메시지 */}
                                {msg?.text && <p className="mb-2 text-sm md:text-base">{msg.text}</p>}

                                {/* 버튼 메시지 */}
                                {msg?.button && (
                                    <button
                                        onClick={() => navigate(msg.button.link)}
                                        className="bg-white text-[#5865f2] text-sm md:text-base font-semibold px-3 py-1 rounded hover:bg-gray-100 transition"
                                    >
                                        {msg.button.text}
                                    </button>
                                )}

                                {/* 통계 메시지 */}
                                {msg?.stats && (
                                    <div className="grid grid-cols-1 gap-3">
                                        {msg.stats.map((stat, sIdx) => (
                                            <div key={sIdx} className="flex flex-col">
                                                <span className="font-bold text-white text-sm md:text-base">{stat.label}</span>
                                                <span className="text-gray-300 text-sm md:text-base">{stat.number}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </main>
        </div>
    );
}
