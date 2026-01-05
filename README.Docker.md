# 🐳 Docker 배포 가이드

## 📁 프로젝트 구조

```
my-app/
├── docker/
│   └── db/
│       └── init/
│           └── 0000_init.sql       # PostgreSQL 초기화 스크립트
├── ws-server/
│   └── Dockerfile                   # WebSocket 서버 Dockerfile
├── Dockerfile                       # Next.js 앱 Dockerfile
├── docker-compose.yml               # Docker Compose 설정
├── .dockerignore                    # Docker 빌드 제외 파일
└── .env.production                  # 프로덕션 환경변수

```

## 🚀 배포 방법

### 1️⃣ 사전 준비

Docker와 Docker Compose가 설치되어 있어야 합니다.

```bash
# Docker 버전 확인
docker --version
docker-compose --version
```

### 2️⃣ 환경변수 설정

`.env.production` 파일을 수정하여 실제 프로덕션 값을 입력하세요:

```bash
# 보안을 위해 기본 비밀번호 변경 필수!
DB_PASSWORD=your_secure_password
MINIO_SECRET_KEY=your_minio_password
JWT_SECRET=your_jwt_secret
```

### 3️⃣ 데이터베이스 초기화

`docker/db/init/0000_init.sql` 파일이 자동으로 실행됩니다.

- 처음 PostgreSQL 컨테이너가 시작될 때만 실행됩니다
- 추가 스크립트는 `docker/db/init/` 디렉토리에 추가하세요 (파일명 순서대로 실행)

### 4️⃣ 빌드 및 실행

```bash
# 개발 환경
docker-compose up -d

# 프로덕션 환경
docker-compose --env-file .env.production up -d --build
```

### 5️⃣ 서비스 접속

- **Next.js 앱**: http://localhost:3000
- **MinIO 콘솔**: http://localhost:9001
- **PostgreSQL**: localhost:5432
- **WebSocket**: ws://localhost:8080

## 🔧 유용한 명령어

```bash
# 로그 확인
docker-compose logs -f

# 특정 서비스 로그만 보기
docker-compose logs -f app
docker-compose logs -f postgres

# 컨테이너 상태 확인
docker-compose ps

# 컨테이너 재시작
docker-compose restart

# 컨테이너 중지
docker-compose stop

# 컨테이너 중지 및 삭제
docker-compose down

# 볼륨까지 모두 삭제 (데이터 삭제 주의!)
docker-compose down -v

# 특정 서비스만 재빌드
docker-compose up -d --build app
```

## 🗄️ 데이터베이스 관리

### DB 백업

```bash
docker exec daangn-db pg_dump -U postgres daangn > backup.sql
```

### DB 복원

```bash
docker exec -i daangn-db psql -U postgres daangn < backup.sql
```

### DB 접속

```bash
docker exec -it daangn-db psql -U postgres -d daangn
```

## 📦 MinIO 버킷 설정

1. http://localhost:9001 접속
2. 로그인 (minioadmin / minioadmin)
3. `images` 버킷 생성
4. Access Policy를 `public`으로 설정

## 🌐 프로덕션 배포 체크리스트

- [ ] `.env.production` 보안 설정 완료
- [ ] DB 비밀번호 변경
- [ ] JWT Secret 키 변경
- [ ] MinIO 비밀번호 변경
- [ ] 도메인 설정 (NEXT_PUBLIC_MINIO_URL)
- [ ] 포트 방화벽 설정
- [ ] SSL/TLS 인증서 설정 (Nginx/Caddy 추가)
- [ ] 백업 전략 수립

## 🔐 보안 강화 (선택사항)

### Nginx 리버스 프록시 추가

```yaml
# docker-compose.yml에 추가
nginx:
    image: nginx:alpine
    ports:
        - '80:80'
        - '443:443'
    volumes:
        - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
        - app
```

## 📊 모니터링

```bash
# 리소스 사용량 확인
docker stats

# 특정 컨테이너 리소스
docker stats daangn-app
```

## ⚠️ 트러블슈팅

### DB 연결 실패

```bash
# 헬스체크 확인
docker-compose ps
# postgres가 healthy 상태인지 확인
```

### 포트 충돌

- 로컬에서 이미 3000, 5432, 9000 포트를 사용 중이면 docker-compose.yml의 포트
  매핑 변경

### 데이터 초기화

```bash
docker-compose down -v
docker-compose up -d
```
