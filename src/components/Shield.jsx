// Escudo usado no logo e no favicon.
export default function Shield({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2.5 20 5.6v5.7c0 5-3.4 8.6-8 9.9-4.6-1.3-8-4.9-8-9.9V5.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m8.6 11.8 2.4 2.4 4.6-4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
