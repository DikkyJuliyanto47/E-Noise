import Link from "next/link";

export default function Header({
  title,
  subtitle,
  rightSlot,
}: {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
          {title}
        </h1>
        {subtitle && (
          <p className="text-slate-400 text-xs sm:text-sm">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2 self-start md:self-auto">
        <Link
          href="/tentang"
          className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs sm:text-sm text-slate-100 transition"
        >
          Tentang Project
        </Link>
        {rightSlot}
      </div>
    </header>
  );
}
