import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Resume = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/data/resume.json')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error(err));
    }, []);

    if (!data) return <div className="text-center py-10 text-gray-400">로딩중...</div>;

    const TimelineCard = ({ item, index, color }) => (
        <motion.div
            className="mb-10 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            {/* 카드 */}
            <div className="ml-10 bg-[#1e1f22] rounded-xl shadow-lg p-5 hover:bg-[#3b3d41] transition">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold text-white">{item.subject}</h4>
                    <span className="text-sm text-gray-400">{item.wdate}</span>
                </div>
                <h5 className="text-indigo-400 font-medium mb-1">{item.title}</h5>
                <p className="text-gray-300 whitespace-pre-wrap">{item.content}</p>
            </div>

            {/* 타임라인 점: 카드 왼쪽 선 위에 고정 */}
            <div className={`absolute w-3 h-3 rounded-full -left-[7px] top-6 ${color}`}></div>
        </motion.div>
    );

    return (
        <section id="resume" className="bg-[#2b2d31] p-6 flex-1">
            <div className="container mx-auto p-6">
                {/* Section Title */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Resume</h2>
                    <svg viewBox="0 0 200 20" className="mx-auto w-64 text-indigo-500 mb-4">
                        <path
                            d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                    <p className="text-gray-400 max-w-2xl mx-auto">{data.descript}</p>
                </div>

                {/* Work Experience */}
                <div className="mb-12">
                    <h3 className="text-2xl text-white font-semibold mb-6">Work Experience</h3>
                    <div className="relative border-l border-gray-600 pl-0">
                        {data.work.map((item, idx) => (
                            <TimelineCard key={item.id} item={item} index={idx} color="bg-indigo-500" />
                        ))}
                    </div>
                </div>

                {/* My Education */}
                <div>
                    <h3 className="text-2xl text-white font-semibold mb-6">My Education</h3>
                    <div className="relative border-l border-gray-600 pl-0">
                        {data.education.map((item, idx) => (
                            <TimelineCard key={item.id} item={item} index={idx} color="bg-green-500" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
