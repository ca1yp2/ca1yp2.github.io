import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function About() {
    const [adata, setAdata] = useState(null);

    useEffect(() => {
        fetch('/data/about.json')
            .then(res => res.json())
            .then(data => setAdata(data))
            .catch(err => console.error(err));
    }, []);

    if (!adata) return <div className="p-6 text-gray-300">로딩 중...</div>;

    // 부모 컨테이너와 각 아이템 애니메이션 설정
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <motion.div
            className="p-6 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 타이틀 섹션 */}
            <motion.div className="text-center" variants={itemVariants}>
                <h2 className="text-2xl font-bold text-white">About</h2>
                <div className="w-full flex justify-center my-2">
                    <svg
                        viewBox="0 0 200 20"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-64 text-indigo-400"
                    >
                        <path
                            d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                </div>
                <p className="text-gray-300 max-w-2xl mx-auto">{adata?.descript}</p>
            </motion.div>

            {/* 프로필 + 내용 */}
            <motion.div
                className="flex flex-col lg:flex-row items-center gap-8"
                variants={itemVariants}
            >
                {/* 이미지 */}
                <div className="flex-shrink-0">
                    <img
                        src={adata?.img}
                        alt="Profile"
                        className="w-64 h-64 object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* 자기소개 */}
                <div className="flex-1 bg-[#2b2d31] p-6 rounded-lg shadow-lg">
                    <h2 className="text-white text-xl font-bold mt-2">{adata?.aboutTitle}</h2>
                    <p className="text-gray-300 mt-3 mb-6">{adata?.aboutContent}</p>

                    {/* 개인 정보 */}
                    <div className="grid grid-cols-2 gap-4">
                        <InfoItem label="Name" value={adata?.name} />
                        <InfoItem label="Phone" value={adata?.phone} />
                        <InfoItem label="Age" value={adata?.age} />
                        <InfoItem label="Email" value={adata?.email} />
                        <InfoItem label="Occupation" value={adata?.occupation} />
                        <InfoItem label="Nationality" value={adata?.nationality} />
                    </div>
                </div>
            </motion.div>

            {/* 스킬 섹션 */}
            <motion.div className="space-y-4" variants={itemVariants}>
                <h3 className="text-white text-xl font-semibold">Skills</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {adata?.skills.map((skill, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-[#2b2d31] p-4 rounded-lg shadow-md"
                            variants={itemVariants}
                        >
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-200 font-medium">{skill.title}</span>
                                <span className="text-gray-400">{skill.level}%</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{skill.scripts}</p>
                            <div className="w-full bg-gray-700 h-2 rounded">
                                <div
                                    className="h-2 bg-indigo-500 rounded"
                                    style={{ width: `${skill.level}%` }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

function InfoItem({ label, value }) {
    return (
        <div>
            <span className="block text-gray-400 text-sm">{label}</span>
            <span className="block text-gray-200 font-medium">{value}</span>
        </div>
    );
}
