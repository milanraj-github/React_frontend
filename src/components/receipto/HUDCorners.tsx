export function HUDCorners({ color = "#22D3EE" }: { color?: string }) {
  const c = { borderColor: color, boxShadow: `0 0 8px ${color}` };
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2" style={c} />
      <div className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2" style={c} />
      <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2" style={c} />
      <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2" style={c} />
    </div>
  );
}
