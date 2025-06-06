import { useDialog } from "@r/hooks";

interface DialogProviderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function DialogProvider({ children }: DialogProviderProps) {
  const { dialogs, removeDialog } = useDialog();
  return (
    <>
      <div className="absolute top-0 grid h-full w-full place-items-center">
        {dialogs.map((i) => (
          <div className="absolute z-10 overflow-hidden rounded-lg bg-zinc-50 shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-200">
            <div className="space-y-4 px-4 py-5">
              <p>{i?.message}</p>
            </div>
            <div className="flex flex-row-reverse bg-zinc-100 px-4 py-2 ring-1 ring-zinc-200">
              {!i?.buttons ? (
                <button onClick={() => i?.id && removeDialog(i.id)}>
                  close
                </button>
              ) : (
                i.buttons.map((j) => (
                  <button
                    onClick={() => {
                      // @ts-expect-error
                      j.action();
                      removeDialog(i.id);
                    }}
                  >
                    {j.label}
                  </button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      {children}
    </>
  );
}
