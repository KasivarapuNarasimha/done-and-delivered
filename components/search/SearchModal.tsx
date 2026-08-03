"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Building2, FileText, Search, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getSearchIndex,
  searchSite,
  type SearchResult,
} from "@/lib/data/search-index";
import { cn } from "@/lib/utils";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const listboxId = useId();

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const index = useMemo(() => getSearchIndex(), []);
  const results = useMemo(() => searchSite(query, index), [query, index]);

  const grouped = useMemo(() => {
    const pages = results.filter((r) => r.category === "Pages");
    const projects = results.filter((r) => r.category === "Projects");
    return { pages, projects };
  }, [results]);

  const flatResults = useMemo(
    () => [...grouped.pages, ...grouped.projects],
    [grouped],
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigateTo = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (flatResults.length === 0) return;
        setActiveIndex((i) => (i + 1) % flatResults.length);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (flatResults.length === 0) return;
        setActiveIndex((i) => (i - 1 + flatResults.length) % flatResults.length);
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const target = flatResults[activeIndex] ?? flatResults[0];
        if (target) navigateTo(target.href);
      }
    },
    [activeIndex, flatResults, navigateTo, onClose],
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pb-8 pt-[min(12vh,6rem)] sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-primary/70 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-[0_30px_90px_rgba(11,46,131,0.28)]"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-primary/8 px-4 py-3.5 sm:px-5">
              <Search
                className="h-5 w-5 shrink-0 text-accent-dark"
                aria-hidden
              />
              <label htmlFor="site-search-input" className="sr-only">
                Search projects or pages
              </label>
              <input
                id="site-search-input"
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects or pages..."
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                role="combobox"
                aria-expanded={true}
                aria-controls={listboxId}
                aria-autocomplete="list"
                aria-activedescendant={
                  flatResults[activeIndex]
                    ? `${listboxId}-option-${activeIndex}`
                    : undefined
                }
                className="min-w-0 flex-1 bg-transparent text-base font-medium text-primary outline-none placeholder:text-muted sm:text-[1.05rem]"
              />
              <button
                type="button"
                onClick={onClose}
                className="touch-target grid h-10 w-10 place-items-center rounded-full border border-primary/10 bg-[#F7FAFF] text-primary transition-colors hover:border-accent/40 hover:bg-accent/10"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              id={listboxId}
              role="listbox"
              aria-label="Search results"
              className="max-h-[min(60vh,28rem)] overflow-y-auto p-3 sm:p-4"
            >
              <p id={titleId} className="sr-only">
                Site search
              </p>

              {!query.trim() ? (
                <p className="px-2 py-6 text-center text-sm text-muted">
                  Start typing to search projects and pages.
                </p>
              ) : flatResults.length === 0 ? (
                <p className="px-2 py-8 text-center text-sm font-medium text-muted">
                  No results found.
                </p>
              ) : (
                <div className="space-y-4">
                  {grouped.pages.length > 0 ? (
                    <ResultGroup
                      label="Pages"
                      items={grouped.pages}
                      flatOffset={0}
                      activeIndex={activeIndex}
                      listboxId={listboxId}
                      onSelect={navigateTo}
                      onHover={setActiveIndex}
                    />
                  ) : null}
                  {grouped.projects.length > 0 ? (
                    <ResultGroup
                      label="Projects"
                      items={grouped.projects}
                      flatOffset={grouped.pages.length}
                      activeIndex={activeIndex}
                      listboxId={listboxId}
                      onSelect={navigateTo}
                      onHover={setActiveIndex}
                    />
                  ) : null}
                </div>
              )}
            </div>

            <div className="hidden border-t border-primary/8 bg-[#F7FAFF] px-4 py-2.5 text-[0.72rem] font-medium text-muted sm:flex sm:items-center sm:justify-between">
              <span>↑↓ navigate · Enter open · Esc close</span>
              <span>{flatResults.length} result{flatResults.length === 1 ? "" : "s"}</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ResultGroup({
  label,
  items,
  flatOffset,
  activeIndex,
  listboxId,
  onSelect,
  onHover,
}: {
  label: string;
  items: SearchResult[];
  flatOffset: number;
  activeIndex: number;
  listboxId: string;
  onSelect: (href: string) => void;
  onHover: (index: number) => void;
}) {
  return (
    <div>
      <p className="mb-2 px-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent-dark">
        {label}
      </p>
      <ul className="space-y-1">
        {items.map((item, i) => {
          const index = flatOffset + i;
          const active = index === activeIndex;
          const Icon = item.category === "Projects" ? Building2 : FileText;
          return (
            <li key={item.id} role="presentation">
              <Link
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={active}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(item.href);
                }}
                onMouseEnter={() => onHover(index)}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl border px-3 py-3 transition-all duration-200",
                  active
                    ? "border-accent/35 bg-[#F7FAFF] shadow-[0_10px_28px_rgba(11,46,131,0.08)]"
                    : "border-transparent hover:border-primary/8 hover:bg-[#F7FAFF]",
                )}
              >
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl border",
                    active
                      ? "border-accent/40 bg-primary text-accent"
                      : "border-primary/10 bg-white text-primary",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-primary">
                    {item.title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted">
                    {item.description}
                  </span>
                </span>
                <ArrowUpRight
                  className={cn(
                    "h-4 w-4 shrink-0 transition-all",
                    active
                      ? "text-accent-dark opacity-100"
                      : "text-primary/40 opacity-60 group-hover:opacity-100",
                  )}
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
