// MinIO 연결 테스트 스크립트
// 실행: npx tsx testMinio.ts

import minioClient, { checkMinioConnection, setBucketPublic } from "@/lib/minioClient";

async function main() {
  await checkMinioConnection();

  const bucketName = "daangn";
  await setBucketPublic(bucketName);

  const objectName = "utils/icon.png";

  try {
    const stat = await minioClient.statObject(bucketName, objectName);
    console.log(`\n✅ 파일 정보: ${bucketName}/${objectName}`);
    console.log(`   - 크기: ${stat.size} bytes`);
    console.log(`   - 타입: ${stat.metaData?.["content-type"] || "unknown"}`);
    console.log(`   - 수정일: ${stat.lastModified}`);
    console.log(`\n🔗 접근 URL: http://localhost:9000/${bucketName}/${objectName}`);
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === "NotFound") {
      console.error(`\n❌ 파일을 찾을 수 없습니다: ${bucketName}/${objectName}`);
    } else {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`\n❌ 파일 조회 실패:`, message);
    }
  }
}

main();
