import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-[var(--color-accent)]">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-[var(--color-muted-foreground)]">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been
        moved. Head back to the home page.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-hover)] focus-ring"
      >
        Back to home
      </Link>
    </Container>
  );
}
