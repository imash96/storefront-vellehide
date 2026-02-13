import { cookies } from "next/headers";
import { use } from "react";

import "@/css/globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const theme = use(cookies()).get('__theme')?.value
  return (
    <html lang="en" data-theme={theme ? theme : "light"}>
      <body>
        {children}
      </body>
    </html>
  );
}
