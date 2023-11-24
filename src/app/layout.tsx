import glob from "fast-glob"

import { Layout } from "@/components/Layout"
import { Providers } from "@/app/providers"

import "@/styles/tailwind.css"

import { type Metadata } from "next"

import { type Section } from "@/components/SectionProvider"

export const metadata: Metadata = {
  title: {
    template: "%s - TypeScript",
    default: "TypeScript Masterclass",
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob("**/*.mdx", { cwd: "src/app" })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      "/" + filename.replace(/(^|\/)page\.mdx$/, ""),
      (await import(`./${filename}`)).sections,
    ])
  )) as Array<[string, Array<Section>]>
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-blue-100 antialiased dark:bg-blue-950">
        <Providers>
          <div className="w-full">
            <Layout allSections={allSections}>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
