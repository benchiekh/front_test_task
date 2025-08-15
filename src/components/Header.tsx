export default function Header({ userName }) {
  return (
    <header className="bg-light py-3 text-center shadow-sm">
      <h2>Hello, {userName}, Start planning today</h2>
      <p className="text-muted">{new Date().toLocaleDateString()}</p>
    </header>
  );
}
