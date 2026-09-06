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
          // Contained on narrow screens: cover crops a 16:9 demo badly inside
          // the mobile band, and the whole frame is the point here. On wide
          // screens it is the section's background, so it fills.
          className="absolute inset-0 h-full w-full object-contain opacity-90 lg:object-cover lg:opacity-45"
        />
      )}
      {/* Only needed where the copy sits over the video. On mobile the band
        * already fades into the text below it, and dimming a letterboxed demo
        * twice just buries it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-gradient-to-t from-bg via-transparent to-bg/60 lg:block"
      />
    </div>
  );
}
