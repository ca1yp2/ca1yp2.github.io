import React, { useState, useEffect } from "react";
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
        fetch("/data/portfolio.json")
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error(err));
    }, []);

    const filterProjects = projects.filter((p) => {
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
                className="w-full max-w-[260px] sm:max-w-full mx-auto bg-[#1e1f22] rounded-xl shadow-lg mb-6 border-l-4 border-indigo-500 overflow-hidden"
            >
                {/* 카드 내부 */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 sm:p-5">
                    <div className="w-full sm:flex-1 sm:min-w-0">
                        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 w-full">
                            <h4 className="text-base sm:text-lg font-semibold text-white break-words">
                                {item.title}
                            </h4>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm sm:text-sm bg-[#2b2d31] hover:bg-[#35373c] text-white border border-[#3a3d42] transition break-words"
                            >
                                <FaGithub className="w-4 h-4 flex-shrink-0" />
                                <span className="hidden sm:inline">{item.title}</span>
                            </a>
                        </div>
                        <h5 className="text-indigo-400 font-medium mt-1 text-sm sm:text-base break-words">
                            {item.subject}
                        </h5>
                        <div className="text-gray-300 mt-2 space-y-1 text-sm sm:text-base">
                            {item.content.map((line, idx) => (
                                <p key={idx}>{line}</p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Swiper 이미지 */}
                <div className="relative w-full mt-3 rounded-xl overflow-hidden mx-auto max-w-full">
                    {item.images.some((img) => img.src) && (
                        <>
                            <Swiper
                                modules={[Navigation, Pagination, Thumbs]}
                                thumbs={{ swiper: thumbsSwiper }}
                                slidesPerView={1}
                                spaceBetween={10}
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                className="w-full"
                            >
                                {item.images.map((img, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="relative w-full h-auto min-h-[200px] sm:min-h-[250px] md:min-h-[300px] bg-black rounded-xl flex items-center justify-center">
                                            <img
                                                src={img.src}
                                                alt={`slide-${idx}`}
                                                className="max-w-full max-h-full object-contain rounded-xl"
                                            />
                                            {img.caption && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1 sm:p-2 text-center text-white text-xs sm:text-sm">
                                                    {img.caption}
                                                </div>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* 썸네일 (데스크톱에서만 표시) */}
                            <Swiper
                                modules={[Thumbs, FreeMode]}
                                onSwiper={setThumbsSwiper}
                                slidesPerView={5}
                                spaceBetween={8}
                                freeMode={true}
                                watchSlidesProgress={true}
                                slideToClickedSlide={true}
                                centeredSlides={true}
                                centeredSlidesBounds={true}
                                className="hidden md:block"
                            >
                                {item.images.map((img, idx) => (
                                    <SwiperSlide key={idx}>
                                        <img
                                            src={img.src}
                                            alt={`thumb-${idx}`}
                                            className={`w-full h-16 object-contain rounded-lg cursor-pointer ${activeIndex === idx
                                                ? "border-indigo-400 border-2"
                                                : "border border-gray-700"
                                                }`}
                                            onClick={() =>
                                                thumbsSwiper && thumbsSwiper.slideTo(idx)
                                            }
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
        <section className="bg-[#2b2d31] p-4 sm:p-6 flex-1 min-h-screen overflow-x-hidden">
            <div className="container mx-auto max-w-6xl px-2 sm:px-6">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Portfolio
                    </h2>
                    <p className="text-gray-400 max-w-md sm:max-w-2xl mx-auto text-sm sm:text-base">
                        제가 진행한 프로젝트들을 소개합니다.
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                        {["all", "team", "personal"].map((f) => (
                            <button
                                key={f}
                                className={`px-3 py-1 text-sm md:text-base rounded ${filter === f
                                    ? "bg-indigo-500 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
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

                <div className="w-full">
                    {filterProjects.map((project, idx) => (
                        <TimelineCard key={project.id} item={project} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
