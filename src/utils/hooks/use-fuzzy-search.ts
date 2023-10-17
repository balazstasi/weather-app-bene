import Fuse from "fuse.js"
import { useMemo } from "react"

/**
 * Generates a fuzzy search using the given data set and query.
 *
 * @param {string[]} dataSet - The array of strings to search through.
 * @param {string} query - The query string to search for.
 * @param {number} [maxResults=8] - The maximum number of results to return. Defaults to 8.
 * @return {string[]} An object containing the search results.
 */
const useFuzzySearch = (
  dataSet: string[],
  query: string,
  maxResults: number = 8,
): {
  results: string[]
} => {
  const fuzzy = useMemo(() => new Fuse(dataSet, { threshold: 0.05 }), [dataSet])

  const results = fuzzy
    .search(query)
    .map((result) => result.item)
    .sort((a, b) => a.localeCompare(b))
    .slice(0, maxResults)

  return {
    results,
  } as {
    results: string[]
  }
}

export { useFuzzySearch }
