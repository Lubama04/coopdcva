"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { FiliereIcon } from "./ui";

export const TOUTES = "toutes";

export type MenuOption = { id: string; label: string; count?: number };

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/** Selected item kept in the URL hash (#karite), so it can be shared and linked to. */
export function useHashSelection(validIds: string[]) {
  const hash = useSyncExternalStore(
    subscribe,
    () => decodeURIComponent(window.location.hash.slice(1)),
    () => "",
  );
  const value = validIds.includes(hash) ? hash : TOUTES;
  function select(id: string) {
    const url = id === TOUTES ? window.location.pathname : `${window.location.pathname}#${id}`;
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
  return [value, select] as const;
}

/**
 * Dropdown to pick one filière (or all). Button + listbox following the ARIA
 * "select-only combobox" pattern: arrows, Home/End, Enter/Space, Escape, typeahead.
 */
export function FiliereMenu({
  label,
  options,
  value,
  onChange,
  allLabel,
}: {
  label: string;
  options: MenuOption[];
  value: string;
  onChange: (id: string) => void;
  allLabel: string;
}) {
  const items: MenuOption[] = [{ id: TOUTES, label: allLabel }, ...options];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const baseId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = items.find((o) => o.id === value) ?? items[0];

  useEffect(() => {
    if (!open) return;
    function onDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  function openMenu() {
    setActive(Math.max(0, items.findIndex((o) => o.id === value)));
    setOpen(true);
  }

  function choose(i: number) {
    onChange(items[i].id);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function matchIndex(key: string) {
    return items.findIndex((o, k) => k > 0 && o.label.toLowerCase().startsWith(key.toLowerCase()));
  }

  function onKeyDown(e: KeyboardEvent) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      } else if (e.key.length === 1) {
        // Typeahead also works on the closed menu: open it on the first matching item.
        const i = matchIndex(e.key);
        setActive(i >= 0 ? i : Math.max(0, items.findIndex((o) => o.id === value)));
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") setActive((a) => Math.min(items.length - 1, a + 1));
    else if (e.key === "ArrowUp") setActive((a) => Math.max(0, a - 1));
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(items.length - 1);
    else if (e.key === "Enter" || e.key === " ") choose(active);
    else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Tab") return;
    } else if (e.key.length === 1) {
      const i = matchIndex(e.key);
      if (i >= 0) setActive(i);
      return;
    } else return;
    e.preventDefault();
  }

  return (
    <div ref={rootRef} className="relative w-full sm:w-[26rem]">
      <span id={`${baseId}-label`} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-sesame-700">
        {label}
      </span>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${baseId}-list`}
        aria-labelledby={`${baseId}-label ${baseId}-value`}
        aria-activedescendant={open ? `${baseId}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className="flex min-h-12 w-full items-center gap-3 sm:min-h-14 rounded-2xl border-2 border-leaf-700 bg-paper px-4 text-left shadow-sm transition-colors hover:bg-leaf-50"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700" aria-hidden="true">
          {current.id === TOUTES ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <FiliereIcon id={current.id} className="h-6 w-6" />
          )}
        </span>
        <span id={`${baseId}-value`} className="flex-1 font-semibold text-ink">
          {current.label}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 shrink-0 text-leaf-700 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <ul
        id={`${baseId}-list`}
        role="listbox"
        aria-labelledby={`${baseId}-label`}
        hidden={!open}
        className="absolute left-0 right-0 z-40 mt-2 max-h-[min(26rem,60dvh)] overflow-y-auto rounded-2xl border border-soil-100 bg-paper p-2 shadow-2xl shadow-leaf-900/20"
      >
        {items.map((o, i) => {
          const selected = o.id === value;
          return (
            <li
              key={o.id}
              id={`${baseId}-opt-${i}`}
              role="option"
              aria-selected={selected}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm ${
                i === active ? "bg-leaf-50" : ""
              } ${selected ? "font-semibold text-leaf-700" : "text-ink"}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center text-leaf-700" aria-hidden="true">
                {o.id === TOUTES ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <FiliereIcon id={o.id} className="h-6 w-6" />
                )}
              </span>
              <span className="flex-1">{o.label}</span>
              {o.count !== undefined && <span className="text-xs text-ink-soft">{o.count}</span>}
              {selected && (
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-leaf-700" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                  <path d="m5 12 5 5 9-10" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
