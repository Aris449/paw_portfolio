import type { Metadata } from "next";
import { Roboto_Mono  } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Paw",
  description: "Paw portfolio by Dmytro Poluektov",
  icons: {
    icon: "/paw-image.png",
  },
};

// bg-[linear-gradient(to_right,#FFF0F0_1px,transparent_1px),linear-gradient(to_bottom,#FFF0F0_1px,transparent_1px)]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable}  font-mono`}
      >
        <div className="flex flex-col  absolute inset-0 -z-10 h-full w-full   bg-[size:6rem_4rem]">
      <Header/>
        <main className="flex-1 flex">
        {children}
        </main>
      <Footer/>
        </div>
      </body>
    </html>
  );
}
