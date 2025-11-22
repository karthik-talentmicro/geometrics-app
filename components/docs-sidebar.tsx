'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Code, Rocket, Shield, Zap, FileCode, Settings } from 'lucide-react';

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '#introduction', icon: BookOpen },
      { title: 'Quick Start', href: '#quick-start', icon: Rocket },
      { title: 'Installation', href: '#installation', icon: Zap },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Configuration', href: '#configuration', icon: Settings },
      { title: 'System Fingerprinting', href: '#fingerprinting', icon: Shield },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'LocaleOS.init()', href: '#init', icon: Code },
      { title: 'LocaleOS.track()', href: '#track', icon: Code },
      { title: 'LocaleOS.trackPageView()', href: '#trackPageView', icon: Code },
      { title: 'LocaleOS.trackEvent()', href: '#trackEvent', icon: Code },
      { title: 'LocaleOS.getFingerprint()', href: '#getFingerprint', icon: Code },
      { title: 'LocaleOS.getDeviceInfo()', href: '#getDeviceInfo', icon: Code },
      { title: 'LocaleOS.getLocationInfo()', href: '#getLocationInfo', icon: Code },
    ],
  },
  {
    title: 'Integration Guides',
    items: [
      { title: 'Next.js', href: '#nextjs', icon: FileCode },
      { title: 'React', href: '#react', icon: FileCode },
      { title: 'Vue', href: '#vue', icon: FileCode },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { title: 'TypeScript', href: '#typescript', icon: Code },
      { title: 'Privacy & Security', href: '#privacy', icon: Shield },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-10">
        <nav className="space-y-8 pr-4">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-sm rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
