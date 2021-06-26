import { useLocation } from "react-router-dom";

/**
 * Gets query parameters from the URL
 * @returns {URLSearchParams}
 */
export default function useQuery() {
  return new URLSearchParams(useLocation().search);
}
