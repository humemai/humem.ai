import styles from "./icon-control.module.css";

type DirectionalControlIconProps = {
  direction: "left" | "right";
};

export function DirectionalControlIcon({ direction }: DirectionalControlIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={styles.directionalIcon}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={direction === "left" ? "M9.75 3.5L5.25 8l4.5 4.5" : "M6.25 3.5L10.75 8l-4.5 4.5"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}