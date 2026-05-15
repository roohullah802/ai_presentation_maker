"use client";

import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Moon, Presentation, Sun, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button, buttonVariants } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/login')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-5xl px-4 py-3">
        <div className="glass rounded-2xl px-4 py-2.5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center">
              <Presentation className="size-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">
              PPT<span className="text-primary">.ai</span>
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-xl"
            >
              {mounted && (theme === 'dark' ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              ))}
            </Button>

            {/* User menu */}
            {mounted && (
              isPending ? (
                <div className="size-9 rounded-full bg-muted animate-pulse" />
              ) : session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all">
                    <Avatar className="size-9 border-2 border-primary/30">
                      <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {session.user.name ? (
                          session.user.name.charAt(0).toUpperCase()
                        ) : (
                          <User className="size-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 glass border-border/50"
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{session.user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <LogOut className="mr-2 size-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  href="/login" 
                  className={cn(buttonVariants({ size: "sm" }), "rounded-xl")}
                >
                  Sign in
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
