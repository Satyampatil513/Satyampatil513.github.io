"use client";

import { useEffect, useState } from "react";
import Nav from "./Nav";
import CommandPalette from "./CommandPalette";

export default function SiteChrome() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCombo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCombo) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Nav onOpenPalette={() => setOpen(true)} />
      {open && <CommandPalette onClose={() => setOpen(false)} />}
    </>
  );
}
