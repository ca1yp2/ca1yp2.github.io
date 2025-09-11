import React, { useState, useEffect } from "react";
import axios from 'axios';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import { FaGithub } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetch('/data/portfolio.json')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error(err));
    }, []);

    const filterProjects = projects.filter(p => {
        if (filter === "all") return true;
        return p.type === filter;
    });

    const TimelineCard = ({ item, index }) => {
        const [thumbsSwiper, setThumbsSwiper] = useState(null);
        const [activeIndex, setActiveIndex] = useState(0);

        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                className="bg-[#1e1f22] rounded-xl shadow-lg p-5 mb-5 border-l-4 border-indigo-500"
            >
                <div className="flex justify-between items-center p-5">
                    <div>
                        <div className="flex items-center gap-3 min-w-0">
                            <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm bg-[#2b2d31] hover:bg-[#35373c] text-white border border-[#3a3d42] transition"
                            >
                                <FaGithub className="w-4 h-4" />
                                <span className="hidden md:inline">{item.title}</span>
                            </a>
                        </div>
                        <h5 className="text-indigo-400 font-medium mb-1">{item.subject}</h5>
                        <div className="text-gray-300">
                            {item.content.map((line, idx) => (
                                <p key={idx}>{line}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative w-full mt-3 rounded-xl overflow-hidden">
                    {item.images.some(img => img.src) && (
                        <>
                            <Swiper
                                modules={[Navigation, Pagination, Thumbs]}
                                navigation
                                thumbs={{ swiper: thumbsSwiper }}
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                className="mb-3"
                            >
                                {item.images.map((img, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="relative w-full pb-[56.25%] bg-black rounded-xl">
                                            <img
                                                src={img.src}
                                                alt={`slide-${idx}`}
                                                className="absolute top-0 left-0 w-full h-full object-contain rounded-xl"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-center text-white">
                                                {img.caption}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Swiper
                                modules={[Thumbs, FreeMode]}
                                onSwiper={setThumbsSwiper}
                                slidesPerView={6}
                                spaceBetween={10}
                                freeMode={true}
                                watchSlidesProgress={true}
                                slideToClickedSlide={true}
                                centeredSlides={true}
                                centeredSlidesBounds={true}
                            >
                                {item.images.map((img, idx) => (
                                    <SwiperSlide key={idx}>
                                        <img
                                            src={img.src}
                                            alt={`thumb-${idx}`}
                                            className={`w-full h-20 object-cover rounded-lg cursor-pointer
                                                ${activeIndex === idx ? 'border-indigo-400 border-3' : 'border border-gray-700'}`}
                                            onClick={() => thumbsSwiper && thumbsSwiper.slideTo(idx)}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <section className="bg-[#2b2d31] p-6 flex-1">
            <div className="container mx-auto max-w-6xl p-6">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Portfolio</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">제가 진행한 프로젝트들을 소개합니다.</p>
                    <div className="mt-4 flex justify-center gap-3">
                        {["all", "team", "personal"].map(f => (
                            <button
                                key={f}
                                className={`px-4 py-2 rounded ${filter === f
                                    ? "bg-indigo-500 text-white"
                                    : "bg-gray-700 text-gray-300"
                                    }`}
                                onClick={() => setFilter(f)}
                            >
                                {f === "all"
                                    ? "전체"
                                    : f === "team"
                                        ? "팀 프로젝트"
                                        : "개인 프로젝트"}
                            </button>
                        ))}
                    </div>
                </div>

                {filterProjects.map((project, idx) => (
                    <TimelineCard key={project.id} item={project} index={idx} />
                ))}
            </div>
        </section>
    );
}
