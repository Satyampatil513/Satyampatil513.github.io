"use client";

import type { StageProps } from "../ProjectStage";

/** The anatomy takes the whole background.
 *
 * The demo carries the section on its own — it already shows the camera moving,
 * the surrounding structures receding and the viewer's own labels appearing, so
 * a second set of labels drawn over the top only competed with it. */
export default function AtlasStage({ active }: StageProps) {
  return (
    <div className="h-full w-full bg-[#0d0e0e]">
      {active && (
        <video
          src="/videos/human-atlas-demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/60"
      />
    </div>
  );
}
