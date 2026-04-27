type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: Props) {
  return (
    <header
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.4em] text-terracotta-600">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-3 font-display text-4xl text-navy-700 sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-navy-700/75 sm:text-lg">
          {subtitle}
        </p>
      )}
    </header>
  );
}
