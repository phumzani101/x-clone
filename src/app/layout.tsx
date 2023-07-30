import Layout from "@/components/myui/Layout";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getUser } from "@/actions/getUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X Clone",
  description: "X Clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
