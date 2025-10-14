import Link from 'next/link';
import DiyaIcon from './diya-icon';

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-6 z-20">
      <div className="container mx-auto flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary hover:text-accent transition-colors">
          <DiyaIcon className="h-6 w-6" />
          <span>દિવાળી શુભેચ્છાઓ</span>
        </Link>
      </div>
    </header>
  );
}
