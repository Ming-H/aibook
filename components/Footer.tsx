import Link from 'next/link';

const footerLinks = {
  navigate: [
    { label: '首页', href: '/' },
    { label: '产品', href: '/products' },
    { label: '关于', href: '/about' },
    { label: '联系', href: '/contact' },
  ],
  channels: [
    { label: 'GitHub', href: 'https://github.com/Ming-H' },
    { label: 'AI Insights', href: 'https://ming-h.github.io/ai-insights/' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[rgba(0,0,0,0.1)] bg-white px-6 py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-[15px] font-semibold text-[rgba(0,0,0,0.95)]">
            DevFox AI
          </p>
          <div className="flex gap-4">
            {footerLinks.navigate.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium no-underline hover:underline"
                style={{ color: '#615d59' }}
              >
                {link.label}
              </Link>
            ))}
            {footerLinks.channels.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium no-underline hover:underline"
                style={{ color: '#615d59' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <p className="text-[14px] text-[#a39e98]">
          &copy; {new Date().getFullYear()} DevFox AI
        </p>
      </div>
    </footer>
  );
}
