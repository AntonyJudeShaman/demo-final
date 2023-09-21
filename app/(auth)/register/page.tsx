"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import logo from "@/components/logo.png"
import { UserAuthForm } from "@/components/user-auth-form"

import bg from "./bg.jpg"

export default function RegisterPage() {
  return (
    <motion.div
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.25 }}
    >
      {" "}
      <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="hidden lg:absolute  lg:inset-0 lg:order-first lg:flex lg:h-full lg:w-full lg:items-center lg:bg-cover lg:bg-center">
          <Image
            src={bg}
            alt="Background"
            className="h-full w-1/2 object-cover"
            style={{
              filter: "contrast(180%) brightness(80%)", // Adjust the values as needed
            }}
          />
        </div>

        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "default" }),
            "absolute right-4 top-4 border border-zinc-100 bg-gradient-to-r from-purple-400/40 to-purple-700/80 md:right-8 md:top-8  "
          )}
        >
          Login
        </Link>
        <div className="hidden h-full bg-muted lg:block" />
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 z-20  hover:bg-blue-950 md:top-8 "
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <Image src={logo} alt="logo" className="mx-auto h-20 w-20" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm className="z-40" />
            <p className="z-40 px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="hover:text-brand z-40 font-heading underline underline-offset-4"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="hover:text-brand z-40 font-heading underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
