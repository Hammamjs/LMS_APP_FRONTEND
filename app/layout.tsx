import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/shared/ui/theme-provider';
import { Navbar } from '@/shared/components/navbar';
import { Footer } from '@/shared/components/footer';
import './globals.css';
import { Toaster } from '@/shared/ui';
import { StoreProvider } from './_provider/storeProvider';
import { AuthProvider } from './_provider/authProvider';
import { LayoutWrapper } from './_provider/layout-wrapper';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'LearnHub - Online Learning Platform',
  description:
    'Master new skills with expert-led courses. Start your learning journey today.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <StoreProvider>
            <AuthProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </AuthProvider>
          </StoreProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
