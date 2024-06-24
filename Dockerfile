# Bước 1: Sử dụng image Node.js để build project
FROM node:14 as builder

# Thiết lập thư mục làm việc
WORKDIR /usr/share/app

# Sao chép các file cần thiết cho việc cài đặt dependencies
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build project
RUN npm run serve

# Khởi chạy Nginx và giữ container không bị đóng
CMD ["pnpm", "start"]