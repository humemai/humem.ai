"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./cookie-consent.module.css";

export const COOKIE_CONSENT_KEY = "humem-cookie-consent";
export const COOKIE_CONSENT_EVENT = "humem-cookie-consent-change";
export const OPEN_COOKIE_SETTINGS_EVENT = "humem-open-cookie-settings";

type ConsentValue = "accepted" | "declined" | null;

function readConsent(): ConsentValue {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

function writeConsent(value: Exclude<ConsentValue, null>) {
  window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}

export function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      const nextConsent = readConsent();
      setIsOpen(nextConsent === null);
    };

    const handleOpen = () => {
      setIsOpen(true);
    };

    syncConsent();
    window.addEventListener("storage", syncConsent);
    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent as EventListener);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpen);

    return () => {
      window.removeEventListener("storage", syncConsent);
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent as EventListener);
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpen);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <aside className={styles.banner} aria-live="polite">
      <p className={styles.copy}>
        This site uses analytics only if you say yes. See the <Link href="/privacy-policy">privacy policy</Link> for details.
      </p>
      <div className={styles.actions}>
        <button className={styles.accept} onClick={() => { writeConsent("accepted"); setIsOpen(false); }} type="button">
          Accept analytics
        </button>
        <button className={styles.decline} onClick={() => { writeConsent("declined"); setIsOpen(false); }} type="button">
          Decline
        </button>
      </div>
    </aside>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      className={className ? `${styles.settings} ${className}` : styles.settings}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
      type="button"
    >
      Cookie settings
    </button>
  );
}