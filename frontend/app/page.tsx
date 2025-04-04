import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to LokDristi</h1>
      <Link href="/suggestions">
        <button>Give a Suggestion</button>
      </Link>
    </div>
  );
}
