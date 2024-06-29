export function shortDescription(description: string) {
  if (description) {
    return description.length < 35
      ? description
      : `${description.substring(0, 35)}...`;
  }
}
