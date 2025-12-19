export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white/8 backdrop-blur-xl border border-white/12 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
