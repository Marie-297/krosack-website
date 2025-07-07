import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/primary/Navbar"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "@/components/primary/Footer";
import { AppContextProvider } from "../../context/AppContext";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Krosack",
  description: "a trusted supplier of high-quality laboratory equipment, providing innovative solutions for scientific research, education, and industrial applications.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={inter.className}>
          <AppContextProvider>
            <Navbar />
            <main className="p-4">{children}</main>
            <Footer />
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>  
  )
}
