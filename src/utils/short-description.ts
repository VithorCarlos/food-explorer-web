export function shortDescription(description: string) {
  if (description) {
    return description.length < 30
      ? description
      : `${description.substring(0, 30)}...`;
  }
}
