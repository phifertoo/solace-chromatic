export const isValidContent = (newContent: string) => {
  return !newContent || newContent.length < 20 || newContent.length > 300;
};
