import { Sparkles } from "lucide-react";

export function RishiMark() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="grid size-10 place-items-center rounded-2xl bg-[#ef6c3b] text-white shadow-[0_8px_24px_rgba(239,108,59,0.22)]">
        <Sparkles className="size-5" strokeWidth={2.2} />
      </span>
      <span className="font-[Georgia] text-xl font-bold tracking-[-0.03em] text-[#163b45]">
        Rishi <span className="text-[#ef6c3b]">notes</span>
      </span>
    </a>
  );
}

export function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ef6c3b]">{children}</p>
  );
}
