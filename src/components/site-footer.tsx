import Image from "next/image";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-consent";
import { footerColumns } from "@/lib/site-data";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <div className={styles.brandHeading}>
            <Image src="/favicon.png" alt="HumemAI icon" width={28} height={28} />
            <p className={styles.eyebrow}>HumemAI</p>
          </div>
          <p className={styles.copy}>
            Persistent, explainable memory for agentic AI systems across conversations,
            documents, tables, graphs, and connected data.
          </p>
        </div>

        <div className={styles.columns}>
          {footerColumns.map((column) => (
            <section className={styles.column} key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className={styles.bottomRow}>
          <p>Open-source roots, practical memory systems, and a hosted product direction for teams building agents.</p>
          <div className={styles.bottomMeta}>
            <CookieSettingsButton className={styles.cookieSettings} />
            <p>© {new Date().getFullYear()} HumemAI</p>
          </div>
        </div>
      </div>
    </footer>
  );
}