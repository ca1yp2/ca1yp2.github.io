import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ServerSidebar from "./components/ServerSidebar";
import ChannelSidebar from "./components/ChannelSidebar";
import MemberPanel from "./components/MemberPanel";
import Topbar from "./components/Topbar";
import BottomBar from "./components/BottomBar";

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

    const [chatLogs, setChatLogs] = useState([
        { type: "question", text: questions[0] },
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentQuestion =
        currentQuestionIndex < questions.length
            ? questions[currentQuestionIndex]
            : null;

    const handleSubmitAnswer = (answer) => {
        if (!currentQuestion) return;

        const key = keyMap[currentQuestionIndex];

        // formData 업데이트
        setFormData((prev) => ({ ...prev, [key]: answer }));

        // 채팅 로그 업데이트
        setChatLogs((prev) => {
            const updatedLogs = [...prev, { type: "answer", text: answer }];

            // 다음 질문
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
    }, [location.pathname])

    return (
        <div className="flex h-screen bg-[#313338] text-[#dbdee1] font-sans">
            <ServerSidebar />
            <ChannelSidebar />
            <div className="flex flex-col flex-1 relative">
                <Topbar />
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 pb-24 scrollbar-thin">
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
                <BottomBar
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmitAnswer}
                    currentQuestion={currentQuestion}
                    isContactPage={isContactPage}
                />
            </div>
            <MemberPanel user={user} />
        </div>
    );
}
