const WORDS_PER_MINUTE = 200;

export interface ReadingMetrics {
  words: number;
  minutes: number;
  label: string;
}

/**
 * Rough reading time for a post body. Fenced code blocks are counted at a
 * lower weight so code-heavy posts don't report inflated times.
 */
export function getReadingMetrics(content: string): ReadingMetrics {
  const withoutCode = content.replace(/```[\s\S]*?```/g, " ");
  const words = withoutCode.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

  return { words, minutes, label: `${minutes} min read` };
}
