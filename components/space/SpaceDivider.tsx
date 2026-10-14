import { MiniAstronaut, Satellite, RingedPlanet } from "./Art";

/** Decorative band between homepage sections: one drifting astronaut plus a planet or satellite. */
export default function SpaceDivider({ variant = 0 }: { variant?: 0 | 1 | 2 }) {
  return (
    <div data-space className="space-layer relative h-28 overflow-hidden sm:h-36" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,#c9d2e6_20%,#c9d2e6_80%,transparent)]" />
      <span className="twinkle absolute left-[8%] top-[30%] h-1 w-1 rounded-full bg-brand-blue" />
      <span className="twinkle delay-2 absolute left-[46%] top-[72%] h-1.5 w-1.5 rounded-full bg-brand-magenta" />
      <span className="twinkle delay-3 absolute right-[12%] top-[22%] h-1 w-1 rounded-full bg-[#f59e0b]" />
      {variant === 0 && (
        <>
          <div className="anim drift-x absolute top-3 w-14 sm:w-16"><MiniAstronaut className="bob h-auto w-full" /></div>
          <RingedPlanet className="absolute right-[6%] top-5 w-20 sm:w-24" color="#c7d2fe" />
        </>
      )}
      {variant === 1 && (
        <>
          <Satellite className="anim drift-sat absolute left-[10%] top-6 w-20 sm:w-24" />
          <div className="anim drift-x-rev absolute top-4 w-12 sm:w-14"><MiniAstronaut className="bob h-auto w-full" visor="#8b5cf6" accent="#2454d7" /></div>
        </>
      )}
      {variant === 2 && (
        <>
          <RingedPlanet className="absolute left-[5%] top-6 w-16 sm:w-20" color="#f4c6e2" />
          <div className="anim drift-x-slow absolute top-2 w-16 sm:w-20"><MiniAstronaut className="bob h-auto w-full" visor="#0891b2" accent="#f59e0b" /></div>
        </>
      )}
    </div>
  );
}
