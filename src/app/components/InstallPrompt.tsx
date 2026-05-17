"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export default function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent || window.navigator.vendor || "";
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream);
    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true,
    );

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!promptEvent) {
      return;
    }

    setIsVisible(false);
    await promptEvent.prompt();

    const choiceResult = await promptEvent.userChoice;
    if (choiceResult.outcome === "accepted") {
      setIsInstalled(true);
    }
    setPromptEvent(null);
  };

  const showIOSInstructions = isIOS && !isStandalone && !isInstalled;
  const showInstallButton = promptEvent && isVisible && !isInstalled;

  if (!showIOSInstructions && !showInstallButton) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
        maxWidth: 320,
        background: "rgba(15, 23, 42, 0.96)",
        color: "#fff",
        borderRadius: 16,
        boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
        padding: "1rem",
      }}
    >
      {showInstallButton ? (
        <button
          type="button"
          onClick={handleInstallClick}
          style={{
            width: "100%",
            padding: "0.85rem 1.2rem",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "9999px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.18)",
          }}
        >
          Установить приложение
        </button>
      ) : null}

      {showIOSInstructions ? (
        <div style={{ marginTop: showInstallButton ? "1rem" : 0 }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Установите приложение на iOS</p>
          <p style={{ margin: "0.75rem 0 0", lineHeight: 1.5, fontSize: "0.95rem" }}>
            Откройте меню Safari и нажмите
            <span style={{ fontWeight: 700 }}> «Поделиться» </span>
            <span role="img" aria-label="share icon">
              ⛅
            </span>
            , а затем выберите
            <span style={{ fontWeight: 700 }}> «На‎ главный экран» </span>
            <span role="img" aria-label="plus icon">
              ➕
            </span>
            .
          </p>
        </div>
      ) : null}
    </div>
  );
}
