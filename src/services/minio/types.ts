export type GetPresignedUrlParams = {
  objectName: string;
  expiresInHours?: number;
};

export type PresignedUrlApiResponse = {
  presignedUrl: string;
};