"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Tilt from "react-parallax-tilt"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

import logo from "./log.svg"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 space-x-5 px-8 md:flex-row md:gap-2 md:px-0">
          <Tilt>
            <Image src={logo} className="w-20" alt="Jude" />
          </Tilt>
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <Link href="https://github.com/AntonyJudeShaman" target="_blank">
            <Button variant="ghost" className="h-8 w-8 px-1">
              <Icons.gitHub className="hover:text-blue-500" />
            </Button>
          </Link>
          <Link href="https://instagram.com/stark-shaman" target="_blank">
            <Button variant="ghost" className="h-8 w-8 px-1">
              <Icons.insta className="hover:text-blue-500" />
            </Button>
          </Link>
          <Link
            href="https://www.linkedin.com/in/antony-jude-shaman/"
            target="_blank"
          >
            <Button
              variant="ghost"
              className="mr-0 h-8 w-8 px-1 xl:mr-16 2xl:mr-16"
            >
              <Icons.linkedin className="hover:text-blue-500" />
            </Button>
          </Link>

          <ModeToggle />
        </div>
      </div>
    </footer>
  )
}
