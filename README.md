# 🥕 중고거래 웹 서비스 (당근마켓 클론코딩)

본 프로젝트는 **웹 기반 중고거래 플랫폼**으로, REST API + WebSocket 기반 실시간
채팅 기능을 포함합니다.

- **Frontend**: Next.js (React)
- **Backend API**: Node.js (REST API)
- **Realtime**: WebSocket 서버 (TypeScript)
- **DB**: PostgreSQL
- **Storage**: MinIO (이미지 업로드)
- **Map**: OpenStreetMap (Leaflet)

---

## 📁 프로젝트 구조 (요약)

```
my-app/
├─ app/                  # Next.js App Router, FrontEnd 페이지
│  └─ api/                  # REST API
├─ ws-server/             # WebSocket 서버
│  └─ index.ts
├─ public/
├─ package.json
└─ README.md
```

---

## 🚀 실행 방법

### 1️⃣ WebSocket 서버 실행

```powershell
PS D:\study-daangn\my-app\ws-server>
npx ts-node --transpile-only -r tsconfig-paths/register index.ts
```

> 실시간 채팅, 읽음 처리, 메시지 전송 등에 사용됩니다.

---

### 2️⃣ Web 페이지 실행 (Next.js)

```powershell
PS D:\study-daangn\my-app>
npm run dev
```

- 기본 접속 주소: 👉 `http://localhost:3000`

---

## 🔐 인증(Auth) API

| ID       | 기능            | Method | Endpoint                   |
| -------- | --------------- | ------ | -------------------------- |
| auth-001 | 회원가입        | POST   | `/api/auth/signup`         |
| auth-002 | 로그인          | POST   | `/api/auth/login`          |
| auth-003 | 비밀번호 재설정 | POST   | `/api/auth/reset-password` |

---

## 👤 사용자(User) API

| ID       | 기능             | Method | Endpoint              |
| -------- | ---------------- | ------ | --------------------- |
| user-001 | 사용자 정보 조회 | GET    | `/api/users/{userId}` |
| user-002 | 사용자 정보 수정 | PUT    | `/api/users/{userId}` |

---

## 🛒 상품(Item) API

| ID       | 기능           | Method | Endpoint              |
| -------- | -------------- | ------ | --------------------- |
| item-001 | 상품 등록      | POST   | `/api/items`          |
| item-002 | 상품 목록 조회 | GET    | `/api/items`          |
| item-003 | 상품 상세 조회 | GET    | `/api/items/{itemId}` |
| item-004 | 상품 수정      | PUT    | `/api/items/{itemId}` |

---

## 🖼️ 이미지(Image) API

| ID        | 기능          | Method | Endpoint                |
| --------- | ------------- | ------ | ----------------------- |
| image-001 | 이미지 업로드 | POST   | `/api/images/upload`    |
| image-002 | 이미지 삭제   | DELETE | `/api/images/{imageId}` |

---

## 💬 채팅(Chat) API

### REST API

| ID       | 기능                    | Method | Endpoint                            |
| -------- | ----------------------- | ------ | ----------------------------------- |
| chat-001 | 채팅방 생성             | POST   | `/api/chat/rooms`                   |
| chat-002 | 채팅방 목록 조회        | GET    | `/api/chat/rooms`                   |
| chat-003 | 메시지 조회             | GET    | `/api/chat/rooms/{roomId}/messages` |
| chat-004 | 마지막 읽은 메시지 갱신 | POST   | `/api/chat/rooms/{roomId}/read`     |

---

### 🔄 WebSocket 이벤트

| 이벤트            | 설명             |
| ----------------- | ---------------- |
| `join_room`       | 채팅방 입장      |
| `send_message`    | 메시지 전송      |
| `receive_message` | 메시지 수신      |
| `read_message`    | 메시지 읽음 처리 |

---

## 🗺️ 위치(Location) 기능

- **OpenStreetMap + Leaflet** 사용
- 지도에서 위치 선택 → 행정동 주소 텍스트 반환
- 예시 결과

    ```
    서울특별시 금천구 가산동
    ```

---

## ⚙️ 환경 변수 예시

```env
DATABASE_URL=postgresql://user:password@localhost:5432/daangn
NEXT_PUBLIC_MINIO_URL=http://localhost:9000
JWT_SECRET=your-secret-key
JWT_ENCRYPTION_KEY=your_32_character_encryption_key
```

---

## ✅ 주요 특징

- JWT 기반 인증
- 실시간 채팅(WebSocket)
- 읽음/안 읽음 메시지 처리
- 이미지 업로드 (MinIO)
- 지도 기반 위치 선택

---

## 📌 참고

- WebSocket 서버는 **반드시 먼저 실행**
- API 서버와 WebSocket 서버는 **서로 독립적으로 동작**
- 프론트엔드는 WebSocket 서버와 직접 통신
