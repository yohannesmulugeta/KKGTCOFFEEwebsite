/** Resolve files in public/media for both local preview and GitHub Pages. */
export function mediaUrl(fileName: string): string {
  return `${import.meta.env.BASE_URL}media/${fileName}`;
}
