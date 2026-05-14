"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/site-data";
import styles from "./site-header.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeDesktopDropdown = () => {
    setOpenDesktopDropdown(null);
  };

  useEffect(() => {
    closeMobileMenu();
    closeDesktopDropdown();
  }, [pathname]);

  const isActive = (href?: string) => {
    if (!href) {
      return false;
    }

    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isGroupActive = (hrefs: string[]) => hrefs.some((href) => isActive(href));

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/">
          <span className={styles.logoMark}>
            <Image src="/favicon.png" alt="HumemAI icon" width={28} height={28} />
          </span>
          <span className={styles.logoText}>HumemAI</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <ul className={styles.desktopList}>
            {navigationItems.map((item) => (
              <li className={styles.desktopItem} key={item.label}>
                {item.items ? (
                  <div
                    className={`${styles.dropdown} ${isGroupActive(item.items.map((subItem) => subItem.href)) ? styles.activeDropdown : ""}`}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        closeDesktopDropdown();
                      }
                    }}
                    onMouseEnter={() => setOpenDesktopDropdown(item.label)}
                    onMouseLeave={closeDesktopDropdown}
                  >
                    <button
                      aria-expanded={openDesktopDropdown === item.label}
                      aria-haspopup="true"
                      className={styles.dropdownLabel}
                      onClick={() => setOpenDesktopDropdown((current) => current === item.label ? null : item.label)}
                      onFocus={() => setOpenDesktopDropdown(item.label)}
                      type="button"
                    >
                      {item.label}
                    </button>
                    <div className={`${styles.dropdownMenu} ${openDesktopDropdown === item.label ? styles.dropdownMenuOpen : ""}`}>
                      {item.items.map((subItem) => (
                        <Link
                          className={`${styles.dropdownLink} ${isActive(subItem.href) ? styles.activeDropdownLink : ""}`}
                          href={subItem.href}
                          key={subItem.label}
                          onClick={closeDesktopDropdown}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link className={isActive(item.href) ? styles.activeNavLink : undefined} href={item.href ?? "/"}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.ctaRow}>
          <a className={styles.secondaryCta} href="https://github.com/humemai" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
          <Link className={styles.primaryCta} href="/contact">
            Get early access
          </Link>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          type="button"
        >
          <span className={styles.hamburgerLines} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div className={styles.mobilePanelWrap}>
          <div className={styles.mobilePanel} id="mobile-navigation">
            {navigationItems.map((item) => (
              <div className={styles.mobileGroup} key={item.label}>
                {item.items ? (
                  <>
                    <p className={`${styles.mobileGroupLabel} ${isGroupActive(item.items.map((subItem) => subItem.href)) ? styles.activeMobileGroupLabel : ""}`}>
                      {item.label}
                    </p>
                    <div className={styles.mobileLinks}>
                      {item.items.map((subItem) => (
                        <Link
                          className={isActive(subItem.href) ? styles.activeMobileLink : undefined}
                          href={subItem.href}
                          key={subItem.label}
                          onClick={closeMobileMenu}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    className={isActive(item.href) ? styles.activeMobileLink : undefined}
                    href={item.href ?? "/"}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className={styles.mobileActions}>
              <a href="https://github.com/humemai" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>
                View on GitHub
              </a>
              <Link href="/contact" onClick={closeMobileMenu}>Get early access</Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}