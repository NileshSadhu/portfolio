export const JavaScriptRequired = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-zinc-950">
      <div className="text-center max-w-md w-full flex flex-col items-center gap-6">
        <p className="text-xs tracking-widest uppercase text-neutral-500">
          Heads up
        </p>

        <h1 className="text-4xl font-medium text-white">
          JavaScript is required.
        </h1>

        <p className="text-sm text-neutral-400 leading-relaxed">
          This site is built with React and needs JavaScript to run. Please
          enable it in your browser settings and refresh the page.
        </p>

        <div className="h-px w-10 bg-neutral-800" />

        <p className="text-xs text-neutral-600">nileshsadhu.in</p>
      </div>
    </div>
  );
};
