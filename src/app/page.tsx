import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>
              HumemAI demo
            </p>
            <h1 className={styles.title}>
              Vercel + Cloudflare smoke test
            </h1>
          </div>
          <span className={styles.badge}>
            Next.js app router
          </span>
        </header>

        <section className={styles.hero}>
          <div className={styles.copy}>
            <p className={styles.lead}>
              This page exists only to validate the new website pipeline: public GitHub
              repo, Vercel deployment, and Cloudflare DNS in front of the apex domain.
            </p>
            <div className={styles.actions}>
              <a
                className={styles.primaryAction}
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Vercel
              </a>
              <a
                className={styles.secondaryAction}
                href="https://dash.cloudflare.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Cloudflare
              </a>
            </div>
          </div>

          <div className={styles.card}>
            <p className={styles.cardTitle}>
              Checklist
            </p>
            <ul className={styles.checklist}>
              <li>Repo is public under the HumemAI GitHub organization.</li>
              <li>Vercel imports the repo and creates a successful production deploy.</li>
              <li>Cloudflare points `humem.ai` to Vercel and serves HTTPS correctly.</li>
            </ul>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>Temporary landing page for deployment validation.</p>
          <p>Next step after this test: replace with the real public site.</p>
        </footer>
      </div>
    </main>
  );
}
