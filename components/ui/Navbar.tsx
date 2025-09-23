'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, CircleDollarSign, Home, ShoppingBag, Gamepad, CreditCard, DollarSign, 
  TableOfContents, MessageSquare, ClipboardList 
} from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Head from 'next/head';
import { ProfileDropdown } from "@/components/ui/ProfileDropdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { FaDiscord, FaFacebook } from "react-icons/fa";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [open, setOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
    const [point, setBalance] = useState(0);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch('/api/me', { credentials: 'include' })
        if (res.ok) {
          setIsLoggedIn(true)
          
          
        } else {
          setIsLoggedIn(false)
        }
      } catch {
        setIsLoggedIn(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <nav className={cn("fixed top-0 left-0 w-full z-50 bg-[#ffffff]/90 backdrop-blur-md shadow-sm p-3")}>
      <div className="container mx-auto flex justify-between items-center max-w-7xl px-4">
        
        {/* Logo */}
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <title>Xyven</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Fan My - Your Fan Page Solution" />
          <link rel="icon" href="/img/image.png" />
        </Head>
        
        <div className="flex items-center space-x-2 mr-8">
          <a href="/">
            <img src="/img/image.png" alt="logo" className="h-10 w-auto" />
          </a>
        </div>
         
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-5 items-center flex-1 justify-start" >
          <li className="flex items-center space-x-1 text-sm text-gray-700 hover:text-[#17aeff] font-medium" style={{  }}

>
            <Link href="/" className="flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>หน้าหลัก</span>
            </Link>
          </li>

          <li className="text-sm text-gray-700 hover:text-[#17aeff] font-medium"style={{  }}

>
            <Link href="/list" className="flex items-center space-x-1">
              <ClipboardList className="h-4 w-4" />
              <span>รายการ</span>
            </Link>
          </li>
          <li className="text-sm text-gray-700 hover:text-[#17aeff] font-medium"style={{  }}

>
            <Link href="/list" className="flex items-center space-x-1">
              <TableOfContents className="h-4 w-4" />
              <span>กิจกรรม</span>
            </Link>
          </li>
          <li className="text-sm text-gray-700">
            <Link href="/amount" className="flex items-center space-x-1 hover:text-[#17aeff] font-medium"style={{  }}
>
  
              <CircleDollarSign className="h-4 w-4" />
              <span>ยอดเงิน</span>
            </Link>
          </li>

          {/* ติดต่อ */}
          <li 
            onClick={() => setContactOpen(true)} 
            className="text-sm text-gray-700 hover:text-[#17aeff] font-medium cursor-pointer flex items-center space-x-1"
          style={{  }}

>
            <MessageSquare className="h-4 w-4" />
            <span>ติดต่อ</span>
          </li>
        </ul>
        
        {/* Search + Buttons */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          {isLoggedIn ? (
            <>
              <div className="flex items-center px-2.5 py-3.5 bg-[#a9e1ff] text-sky-700 rounded-full border border-sky-500 shadow-sm hover:bg-[#a9e1ff] transition text-xs h-8 min-h-0"> 
                <DollarSign className="h-4 w-4" />
                <span className="text-xs font-medium">{new Intl.NumberFormat("th-TH", {
                }).format(point)}</span>
              </div>
              <ProfileDropdown />
            </>
          ) : (
            <Link href="#">
              <Button
                className="w-full rounded-[10px] bg-gradient-to-r   border-none transition-opacity duration-300 text-white hover:opacity-90 px-4 py-2" style={{ background: 'linear-gradient(90deg, #17aeff 0%, #c2e4ff 100%)' }}

              >
                เริ่มต้นกับเรา
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-10 w-10 text-zinc-900" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[300px] bg-[#ffffff]/95 backdrop-blur-md text-[#000000]">
              <div className="pt-15 space-y-5">
                <ul className="flex flex-col space-y-6 text-gray-700 ">
                  <li className="flex items-center space-x-1 font-medium">
                    <div className="h-5 w-5 " />
                    <Home className="h-4 w-4" />
                    <Link href="/">หน้าหลัก</Link>
                  </li>
                  <li className="flex items-center space-x-1 font-medium">
                    <div className="h-5 w-5 " />
                    <ClipboardList className="h-4 w-4" />
                    <Link href="/list">รายการ</Link>
                  </li>
                  <li className="flex items-center space-x-1 font-medium">
                    <div className="h-5 w-5" />
                    <TableOfContents className="h-4 w-4" />
                    <Link href="/list">กิจกรรม</Link>
                  </li>
                  <li className="flex items-center space-x-1 font-medium">
                    <div className="h-5 w-5" />
                    <CircleDollarSign className="h-4 w-4" />
                    <Link href="/amount">ยอดเงิน</Link>
                  </li>
                  <li 
                    onClick={() => setContactOpen(true)} 
                    className="flex items-center space-x-1 font-medium cursor-pointer"
                  >
                    <div className="h-5 w-5" />
                    <MessageSquare className="h-4 w-4" />
                    <span>ติดต่อ</span>
                  </li>
                  
                </ul>

                <div className="flex items-center text-sm text-gray-700 py-2">
                  <hr className="flex-grow border-t border-gray-300" />
                  {isLoggedIn ? (
                    <span className="px-3 whitespace-nowrap">ระบบสมาชิก</span>
                  ) : (
                    <span className="px-3 whitespace-nowrap">เริ่มต้นกับเรา</span>
                  )}
                  <hr className="flex-grow border-t border-gray-300" />
                </div>

                <div className="flex items-center justify-between px-1">
                  <Link href="#" className="flex items-center space-x-2 text-gray-700">
                    <div className="h-5 w-5" />
                    {isLoggedIn ? (
                      <ProfileDropdown />
                    ) : (
                      <Link href="#">
                        <Button
                          className="w-full rounded-[10px] bg-gradient-to-r from-[#17aeff] via-[#17aeff] to-[#c2e4ff] border-none transition-opacity duration-300 text-white hover:opacity-90"
                        >
                          เริ่มต้นกับเรา
                        </Button>
                      </Link>
                    )}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Contact Dialog */}
    <Dialog open={contactOpen} onOpenChange={setContactOpen}>
  <DialogContent className="animate-fade-in-out1 max-w-md rounded-2xl p-6 shadow-lg border border-gray-200">
    <DialogHeader>
      <DialogTitle>ติดต่อเรา</DialogTitle>
      <p className="text-sm text-muted-foreground">ช่องทางการติดต่อ</p>
    </DialogHeader>

    <div className="space-y-3">
      {/* <div className="flex items-center space-x-3 p-2 rounded-md bg-zinc-100 hover:bg-zinc-200">
        <FaDiscord className="h-6 w-6 text-indigo-500 " />
        <div>
          <p className="font-medium">Discord</p>
          <Link
            href="https://discord.gg/gDCKXNcCvF"
            target="_blank"
            className="text-sm text-zinc-600 hover:underline"
          >
            discord.gg/gDCKXNcCvF
          </Link>
        </div>
      </div> */}

      <div className="flex items-center space-x-3 p-2 rounded-md bg-zinc-100 hover:bg-zinc-200">
        <FaFacebook className="h-6 w-6 text-blue-600" />
        <div>
          <p className="font-medium">Facebook</p>
          <Link
            href="https://www.facebook.com/kasemprem.thongun"
            target="_blank"
            className="text-sm text-zinc-600 hover:underline"
          >
            facebook.com/Kasemprem
          </Link>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>
    </nav>
  )
}
