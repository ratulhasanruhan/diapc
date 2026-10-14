/** Static, server-rendered orbital decoration. CSS-only, no JS, no continuous animation. */
export default function OrbitalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="orbital-orb orbital-orb-one" />
      <div className="orbital-orb orbital-orb-two" />
      <div className="orbital-ring orbital-ring-one" />
      <div className="orbital-ring orbital-ring-two" />
      <span className="orbital-star orbital-star-one" />
      <span className="orbital-star orbital-star-two" />
      <span className="orbital-star orbital-star-three" />
    </div>
  );
}
