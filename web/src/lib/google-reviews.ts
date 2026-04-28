export type GoogleReview = {
  authorName: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  relativeTime: string;
  language?: string;
};

export type PlaceReviews = {
  rating: number;
  totalRatings: number;
  reviews: GoogleReview[];
};

type GooglePlacesApiReview = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  relative_time_description: string;
  language?: string;
};

type GooglePlacesApiResponse = {
  status: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: GooglePlacesApiReview[];
  };
};

/**
 * Trae las últimas reseñas del Google Business Profile vía Places API (legacy).
 *
 * Variables de entorno requeridas (configurar en Vercel):
 *   - GOOGLE_PLACES_API_KEY: API key con Places API habilitada
 *   - GOOGLE_PLACE_ID: ID del Business Profile (formato `ChIJxxx...`)
 *
 * Cacheo: 24h vía Next.js fetch revalidate. Free tier de Places API:
 * 11.000+ requests/mes — con cache nos quedamos en 30 requests/mes.
 *
 * Si no hay credenciales o la llamada falla, retorna null y el componente
 * muestra empty state con CTA para dejar reseña.
 */
export async function fetchPlaceReviews(): Promise<PlaceReviews | null> {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    return null;
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "reviews,rating,user_ratings_total");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("language", "es");
  url.searchParams.set("reviews_sort", "most_relevant");

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 * 60 * 24 }, // 24h
    });
    if (!res.ok) {
      console.warn(
        `[google-reviews] HTTP ${res.status} fetching Place Details`,
      );
      return null;
    }
    const data: GooglePlacesApiResponse = await res.json();
    if (data.status !== "OK" || !data.result) {
      console.warn("[google-reviews] status:", data.status);
      return null;
    }

    return {
      rating: data.result.rating ?? 0,
      totalRatings: data.result.user_ratings_total ?? 0,
      reviews: (data.result.reviews ?? []).map((r) => ({
        authorName: r.author_name,
        authorPhoto: r.profile_photo_url,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relative_time_description,
        language: r.language,
      })),
    };
  } catch (err) {
    console.error("[google-reviews]", err);
    return null;
  }
}
