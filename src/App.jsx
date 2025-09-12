import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ServerSidebar from "./components/ServerSidebar";
import ChannelSidebar from "./components/ChannelSidebar";
import MemberPanel from "./components/MemberPanel";
import Topbar from "./components/Topbar";
import BottomBar from "./components/BottomBar";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";

const user = {
    cover: "../img/cover.jpg",
    avatar: "../img/me.jpg",
    status: "online",
    name: "ca1yp2",
    tag: "#dev",
    joinDate: "신입 개발자",
};

export default function App() {
    const location = useLocation();
    const isContactPage = location.pathname === "/contact";

    // Contact 페이지 상태 관리
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const questions = [
        "이름을 입력해주세요.",
        "이메일을 입력해주세요.",
        "제목을 입력해주세요.",
        "내용을 입력해주세요.",
    ];

    const keyMap = ["name", "email", "subject", "message"];

    const [chatLogs, setChatLogs] = useState([{ type: "question", text: questions[0] }]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentQuestion =
        currentQuestionIndex < questions.length
            ? questions[currentQuestionIndex]
            : null;

    const handleSubmitAnswer = (answer) => {
        if (!currentQuestion) return;
        const key = keyMap[currentQuestionIndex];

        setFormData((prev) => ({ ...prev, [key]: answer }));

        setChatLogs((prev) => {
            const updatedLogs = [...prev, { type: "answer", text: answer }];

            if (currentQuestionIndex + 1 < questions.length) {
                setCurrentQuestionIndex((prev) => prev + 1);
                updatedLogs.push({ type: "question", text: questions[currentQuestionIndex + 1] });
            } else {
                setCurrentQuestionIndex(questions.length);
                updatedLogs.push({ type: "info", text: "모든 질문이 완료되었습니다!" });
            }

            return updatedLogs;
        });
    };

    const scrollContainerRef = useRef();

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: "instant" });
        }
    }, [location.pathname]);

    // 모바일 메뉴 상태
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isMobile = window.innerWidth < 768;

    return (
        <div className="flex h-screen bg-[#313338] text-[#dbdee1] font-sans">
            <ServerSidebar />

            {!isMobile && <ChannelSidebar />}

            <div className="flex flex-col flex-1 relative">
                {/* Topbar */}
                <Topbar>
                    {/* 모바일 메뉴 버튼 */}
                    {isMobile && (
                        <button
                            className="mr-2 p-2 rounded-md bg-[#1e1f22] text-white hover:bg-[#5865f2] transition"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                    )}
                </Topbar>

                {/* 모바일 모달 사이드바 */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* 배경 블러/반투명 */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black z-40 backdrop-blur"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />

                            <ChannelSidebar
                                isMobile={true}
                                closeSidebar={() => setIsMobileMenuOpen(false)}
                            />
                        </>
                    )}
                </AnimatePresence>

                {/* 메인 콘텐츠 */}
                <div
                    ref={scrollContainerRef}
                    className={`flex-1 overflow-y-auto p-6 max-w-full scrollbar-thin ${isContactPage ? "pb-[72px]" : "pb-6"
                        }`}
                >
                    <Outlet
                        context={{
                            formData,
                            setFormData,
                            chatLogs,
                            questions,
                            currentQuestionIndex,
                            currentQuestion,
                            setChatLogs,
                            setCurrentQuestionIndex,
                            handleSubmitAnswer,
                        }}
                    />
                </div>

                <div className={`w-full ${isContactPage ? "fixed bottom-0 left-0" : "relative"
                    }`}
                >
                    <BottomBar
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmitAnswer}
                        currentQuestion={currentQuestion}
                        isContactPage={isContactPage}
                    />
                </div>

            </div>

            <MemberPanel user={user} />
        </div>
    );
}
