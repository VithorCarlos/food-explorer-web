export const convertToCamelCase = (text: string) => {
  if (text) {
    return text
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/^\w/, (c) => c.toUpperCase());
  }
};
