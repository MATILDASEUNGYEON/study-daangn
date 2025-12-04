import { Client } from "minio";
import dotenv from "dotenv";
dotenv.config();

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: Number(process.env.PORT) || 9000,
  useSSL: false,
  accessKey: process.env.ACCESS_KEY || "minioadmin",
  secretKey: process.env.SECRET_KEY || "minioadmin",
});

export async function checkMinioConnection(): Promise<boolean> {
  try {
    const buckets = await minioClient.listBuckets();
    console.log("✅ MinIO 연결 성공!");
    console.log("버킷 목록:", buckets.map(b => b.name));
    return true;
  } catch (error) {
    console.error("❌ MinIO 연결 실패:", error);
    return false;
  }
}

export async function setBucketPublic(bucketName: string): Promise<void> {
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: ["*"] },
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  };

  try {
    await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log(`✅ ${bucketName} 버킷을 public으로 설정했습니다.`);
  } catch (error) {
    console.error(`❌ 버킷 정책 설정 실패:`, error);
  }
}

export default minioClient;
