import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/primary/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Krosack",
  description: "a trusted supplier of high-quality laboratory equipment, providing innovative solutions for scientific research, education, and industrial applications.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}
