export const randomFileName = (originalFileName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substr(2, 6);
  const fileExtension = originalFileName.split(".").pop();
  return `${timestamp}_${randomString}.${fileExtension}`;
};
