import { publish } from "gh-pages";

publish(
    "dist",
    {
        repo: "https://github.com/ca1yp2/ca1yp2.github.io.git",
        branch: "gh-pages",
        dotfiles: true,
        history: false, // --no-history 옵션과 동일
        message: "Deploy React Blog"
    },
    (err) => {
        if (err) {
            console.error("🚨 배포 실패:", err);
        } else {
            console.log("✅ 배포 성공! 사이트를 확인하세요 👉 https://ca1yp2.github.io/");
        }
    }
);