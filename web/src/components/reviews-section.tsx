import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";
import { fetchPlaceReviews, type GoogleReview } from "@/lib/google-reviews";

const GOOGLE_REVIEW_URL = "https://g.page/r/CakqDxt-beSJEAE/review";

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function StarRating({
  value,
  size = "sm",
}: {
  value: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };
  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={sizes[size]}
          strokeWidth={1.5}
          fill={n <= Math.round(value) ? "#FFB400" : "transparent"}
          color={n <= Math.round(value) ? "#FFB400" : "#E0DDDA"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initials = review.authorName
    .split(" ")
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <article className="flex h-full flex-col rounded-2xl border border-blush-200 bg-cream-50 p-6">
      <StarRating value={review.rating} size="md" />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy-700/85">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <footer className="mt-5 flex items-center gap-3 border-t border-blush-200 pt-4">
        {review.authorPhoto ? (
          <Image
            src={review.authorPhoto}
            alt={review.authorName}
            width={36}
            height={36}
            className="rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blush-200 text-xs font-medium text-navy-700">
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-navy-700">
            {review.authorName}
          </p>
          <p className="text-xs text-navy-700/55">{review.relativeTime}</p>
        </div>
        <GoogleLogo className="h-4 w-4 flex-shrink-0" />
      </footer>
    </article>
  );
}

function ReviewsHeader({
  rating,
  totalRatings,
}: {
  rating?: number;
  totalRatings?: number;
}) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-terracotta-600">
        Reseñas en Google
      </p>
      <h2 className="mt-3 font-display text-3xl text-navy-700 sm:text-4xl">
        Lo que dicen nuestras clientas
      </h2>
      {rating && totalRatings && totalRatings > 0 && (
        <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-blush-200 bg-cream-50 px-5 py-2.5">
          <span className="font-display text-2xl text-navy-700">
            {rating.toFixed(1)}
          </span>
          <StarRating value={rating} size="md" />
          <span className="text-sm text-navy-700/65">
            · {totalRatings} {totalRatings === 1 ? "reseña" : "reseñas"}
          </span>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <section className="bg-cream-200/70 py-20">
      <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-100">
          <Star
            className="h-6 w-6 text-terracotta-600"
            strokeWidth={2}
            fill="currentColor"
          />
        </div>
        <p className="mt-5 text-xs uppercase tracking-[0.4em] text-terracotta-600">
          Reseñas
        </p>
        <h2 className="mt-3 font-display text-3xl text-navy-700 sm:text-4xl">
          ¿Ya tienes una prenda Lindamar?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-navy-700/75">
          Tu opinión ayuda a otras personas a descubrir nuestra marca.
          Déjanos tu reseña en Google — la mostraremos aquí cuando llegue.
        </p>
        <Link
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy-700 px-6 py-3 text-sm font-medium text-cream-100 transition hover:bg-navy-900"
        >
          <Star className="h-4 w-4" fill="currentColor" />
          Déjanos tu reseña en Google
        </Link>
      </div>
    </section>
  );
}

export async function ReviewsSection() {
  const data = await fetchPlaceReviews();

  if (!data || data.reviews.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="bg-cream-200/70 py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ReviewsHeader
          rating={data.rating}
          totalRatings={data.totalRatings}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.reviews.slice(0, 6).map((r, i) => (
            <ReviewCard key={`${r.authorName}-${i}`} review={r} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-navy-700 px-6 py-3 text-sm font-medium text-cream-100 transition hover:bg-navy-900"
          >
            <Star className="h-4 w-4" fill="currentColor" />
            Déjanos tu reseña en Google
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
