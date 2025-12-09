import { Client } from "minio";
import dotenv from "dotenv";
dotenv.config();

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || "localhost",
  port: Number(process.env.MINIO_PORT) || 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
  secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
});

const IMAGE_BUCKET = process.env.MINIO_BUCKET || "images";

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

function validateFileExtension(filename: string): boolean {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return ALLOWED_EXTENSIONS.includes(ext);
}

export async function uploadImage(file: File): Promise<string> {
  if (!validateFileExtension(file.name)) {
    throw new Error(`허용되지 않는 파일 형식입니다. (허용: ${ALLOWED_EXTENSIONS.join(", ")})`);
  }

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const metaData = {
    "Content-Type": file.type,
  };

  const bucketExists = await minioClient.bucketExists(IMAGE_BUCKET);
  if (!bucketExists) {
    await minioClient.makeBucket(IMAGE_BUCKET);
    await setBucketPublic(IMAGE_BUCKET);
  }

  await minioClient.putObject(IMAGE_BUCKET, fileName, buffer, buffer.length, metaData);

  const publicUrl = process.env.MINIO_PUBLIC_URL || `http://localhost:9000`;
  return `${publicUrl}/${IMAGE_BUCKET}/${fileName}`;
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file));
  return Promise.all(uploadPromises);
}

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
