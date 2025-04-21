export default function DevBug({ children }) {
  return (
    <div className="p-4 border bg-rose-50 border-rose-600 max-w-[720px] text-sm mx-auto rounded-lg">
      <p className="font-semibold text-black mb-2">
        ✅ TODO / KNOWN BUGS TO FIX:
      </p>
      {children}
    </div>
  );
}
