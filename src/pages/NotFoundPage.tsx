import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main>
      <h1>404 - Strona nie znaleziona</h1>
      <p>
        <Link to="/">Wróć na stronę główną</Link>
      </p>
    </main>
  );
}

