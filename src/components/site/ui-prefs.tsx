import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ViewMode = "desktop" | "mobile";

type UiPrefs = {
  fontStep: number;
  setFontStep: (n: number) => void;
  highContrast: boolean;
  toggleContrast: () => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
};

const FONT_STEPS = [0.875, 1, 1.125, 1.25];

const UiPrefsContext = createContext<UiPrefs | null>(null);

export function UiPrefsProvider({ children }: { children: ReactNode }) {
  const [fontStep, setFontStep] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");

  useEffect(() => {
    const scale = FONT_STEPS[fontStep] ?? 1;
    document.documentElement.style.fontSize = `${scale * 16}px`;
  }, [fontStep]);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  return (
    <UiPrefsContext.Provider
      value={{
        fontStep,
        setFontStep: (n) => setFontStep(Math.min(FONT_STEPS.length - 1, Math.max(0, n))),
        highContrast,
        toggleContrast: () => setHighContrast((v) => !v),
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </UiPrefsContext.Provider>
  );
}

export function useUiPrefs() {
  const ctx = useContext(UiPrefsContext);
  if (!ctx) throw new Error("useUiPrefs must be used inside UiPrefsProvider");
  return ctx;
}