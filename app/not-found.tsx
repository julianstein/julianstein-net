import Link from 'next/link';
import { PageTransition } from '@/components/page-transition';

export default function NotFound() {
    return (
        <PageTransition>
            <div className="px-1.5 pt-3 text-sm">
                <p>Nothing here.</p>
                <Link href="/" className="underline hover:text-gray-400">
                    back home
                </Link>
            </div>
        </PageTransition>
    );
}
