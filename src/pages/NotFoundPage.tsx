import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main>
      <h1>404 - Page not found</h1>
      <p>
        <Link aria-label="Return to home page" to="/home">Return to home page</Link>
      </p>
    </main>
  );
}

