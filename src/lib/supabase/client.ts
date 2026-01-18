import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          if (typeof document === 'undefined') return undefined
          const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
          return match ? decodeURIComponent(match[2]) : undefined
        },
        set(name: string, value: string, options?: { maxAge?: number; path?: string }) {
          if (typeof document === 'undefined') return
          const parts = [`${name}=${encodeURIComponent(value)}`, `Path=${options?.path ?? '/'}`]
          if (options?.maxAge) parts.push(`Max-Age=${options.maxAge}`)
          document.cookie = parts.join('; ')
        },
        remove(name: string, options?: { path?: string }) {
          if (typeof document === 'undefined') return
          document.cookie = `${name}=; Max-Age=0; Path=${options?.path ?? '/'}`
        },
      },
    }
  )
}