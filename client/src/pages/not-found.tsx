import { Link } from "wouter";

export default function NotFound() {
  return (
    <div
      data-testid="page-not-found"
      className="dark grid min-h-screen place-items-center bg-background text-foreground"
    >
      <div className="liquid-glass relative w-[min(560px,92vw)] px-7 py-8">
        <div
          className="text-[12px] uppercase tracking-[0.22em] text-white/55"
          data-testid="text-404-eyebrow"
        >
          Not found
        </div>
        <h1
          className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white/92"
          data-testid="text-404-title"
        >
          This page doesn’t exist.
        </h1>
        <p
          className="mt-3 text-sm leading-relaxed text-white/65"
          data-testid="text-404-body"
        >
          Try heading back to the home page.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            data-testid="link-404-home"
            className="inline-flex rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-white/90 ring-1 ring-white/12 transition hover:bg-white/12 focus:outline-none focus-visible:focus-ring"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
