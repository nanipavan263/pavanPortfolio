"use client";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#070d0c]">
      {/* Aurora Light Blob 1 */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr from-[#e1e440]/25 to-[#186e4f]/25 blur-[140px] animate-aurora" />

      {/* Aurora Light Blob 2 */}
      <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full bg-gradient-to-br from-[#186e4f]/30 to-[#e1e440]/15 blur-[150px] animate-aurora [animation-delay:-7s]" />

      {/* Aurora Light Blob 3 */}
      <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] md:w-[750px] md:h-[750px] rounded-full bg-gradient-to-t from-[#fffdec]/10 to-[#186e4f]/20 blur-[160px] animate-aurora [animation-delay:-14s]" />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Ambient Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7, 13, 12,0.8)_100%)]" />
    </div>
  );
}
