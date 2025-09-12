import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Resume = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/data/resume.json")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error(err));
    }, []);

    if (!data)
        return (
            <div className="text-center py-10 text-gray-400">로딩중...</div>
        );

    // 타임라인 카드 컴포넌트
    const TimelineCard = ({ item, index }) => (
        <motion.div
            className="mb-10 relative ml-8 md:ml-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
        >
            {/* 카드 */}
            <div className="bg-[#1e1f22] rounded-xl shadow-lg p-4 md:p-5 hover:bg-[#3b3d41] transition">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <h4 className="text-white font-semibold text-base md:text-lg">
                        {item.subject}
                    </h4>
                    <span className="text-sm text-gray-400 mt-1 md:mt-0">
                        {item.wdate}
                    </span>
                </div>
                <h5 className="text-indigo-400 font-medium mb-1 text-sm md:text-base">
                    {item.title}
                </h5>
                <p className="text-gray-300 whitespace-pre-wrap text-sm md:text-base">
                    {item.content}
                </p>
            </div>
        </motion.div>
    );

    return (
        <section id="resume" className="bg-[#2b2d31] p-4 md:p-6 flex-1">
            <div className="container mx-auto px-2 md:px-6">
                {/* Section Title */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Resume
                    </h2>
                    <svg
                        viewBox="0 0 200 20"
                        className="mx-auto w-48 md:w-64 text-indigo-500 mb-4"
                    >
                        <path
                            d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                    <p className="text-gray-400 text-sm md:text-base max-w-md md:max-w-2xl mx-auto">
                        {data.descript}
                    </p>
                </div>

                {/* Work Experience */}
                <div className="mb-12 relative">
                    <h3 className="text-xl md:text-2xl text-white font-semibold mb-6">
                        Work Experience
                    </h3>
                    <div className="relative border-l border-gray-600">
                        {data.work.map((item, idx) => (
                            <div key={item.id} className="relative">
                                {/* 타임라인 점 */}
                                <div className="absolute w-3 h-3 rounded-full bg-indigo-500 left-0 top-5 md:top-6 transform -translate-x-1/2"></div>
                                <TimelineCard item={item} index={idx} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div className="relative">
                    <h3 className="text-xl md:text-2xl text-white font-semibold mb-6">
                        My Education
                    </h3>
                    <div className="relative border-l border-gray-600">
                        {data.education.map((item, idx) => (
                            <div key={item.id} className="relative">
                                {/* 타임라인 점 */}
                                <div className="absolute w-3 h-3 rounded-full bg-green-500 left-0 top-5 md:top-6 transform -translate-x-1/2"></div>
                                <TimelineCard item={item} index={idx} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
