/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            borderWidth: {
                '3': '3px'
            }
        },
    },
    plugins: [],
}

