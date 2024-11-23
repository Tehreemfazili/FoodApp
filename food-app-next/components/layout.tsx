import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* <PreviewAlert /> */}
      <main className="container py-10 mx-auto">{children}</main>
    </>
  );
}
