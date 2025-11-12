# app.py

import os
import time

# Giả lập một ứng dụng web đơn giản hoặc một tiến trình nền
def main():
    # Lấy biến môi trường PORT (thường được Kubernetes hoặc Docker đặt)
    port = os.environ.get('PORT', '8080')
    
    print("------------------------------------------")
    print(f"Ứng dụng DevOps (Python) đã khởi động!")
    print(f"Lắng nghe trên cổng: {port}")
    print("------------------------------------------")
    
    # Giữ cho Container luôn chạy
    while True:
        # In một tin nhắn log sau mỗi 5 giây
        print(f"[{time.strftime('%H:%M:%S')}] App đang hoạt động bình thường...")
        time.sleep(5)

if __name__ == "__main__":
    main()