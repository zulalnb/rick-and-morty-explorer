// Define the structure for individual Location
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[] | [];
  url: string;
  created: string;
}

export interface LocationAPIResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Location[];
}
