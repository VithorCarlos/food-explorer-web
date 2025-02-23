import { Toast } from "./toast";

interface ProviderProps {
  children: React.ReactNode;
}

export const Provider = async ({ children }: ProviderProps) => {
  return (
    <>
      <Toast />
      {children}
    </>
  );
};
