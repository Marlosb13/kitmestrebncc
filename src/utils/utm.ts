import { useState, useEffect } from "react";

/**
 * Appends the current page's query parameters to a given URL.
 * This guarantees that all tracking UTMs (and custom parameters) are preserved
 * even if external scripts fail to load or find the elements.
 */
export function getUrlWithUtms(baseUrl: string): string {
  if (typeof window === "undefined") return baseUrl;
  
  const search = window.location.search;
  if (!search) return baseUrl;

  try {
    const url = new URL(baseUrl);
    const searchParams = new URLSearchParams(search);
    
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    
    return url.toString();
  } catch (e) {
    // Fallback if URL is relative or invalid
    const separator = baseUrl.includes("?") ? "&" : "?";
    const cleanSearch = search.startsWith("?") ? search.substring(1) : search;
    return `${baseUrl}${separator}${cleanSearch}`;
  }
}

/**
 * React hook that facilitates automatic trigger of UTMify scripts
 * and provides a state-safe URL generator function.
 */
export function useUtmPropagation() {
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchString(window.location.search);
      
      // Execute UTMify manual propagation if available on mount
      if ((window as any).utmifyPropagate) {
        try {
          (window as any).utmifyPropagate();
        } catch (err) {
          console.warn("UTMify propagate on mount failed:", err);
        }
      }
    }
  }, []);

  const getPropagatedUrl = (baseUrl: string): string => {
    const currentSearch = searchString || (typeof window !== "undefined" ? window.location.search : "");
    if (!currentSearch) return baseUrl;

    try {
      const url = new URL(baseUrl);
      const searchParams = new URLSearchParams(currentSearch);
      
      searchParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
      
      return url.toString();
    } catch (e) {
      const separator = baseUrl.includes("?") ? "&" : "?";
      const cleanSearch = currentSearch.startsWith("?") ? currentSearch.substring(1) : currentSearch;
      return `${baseUrl}${separator}${cleanSearch}`;
    }
  };

  return { getPropagatedUrl };
}
