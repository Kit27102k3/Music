import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://zingmp3.vn', // Địa chỉ máy chủ đích
        changeOrigin: true, // Thay đổi origin của yêu cầu
        rewrite: (path) => path.replace(/^\/api/, ''), // Thay đổi đường dẫn
      },
    },
  },
});
