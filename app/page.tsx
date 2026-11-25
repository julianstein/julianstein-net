import { HomeVideo } from '@/components/home-video';
import { PageTransition } from '@/components/page-transition';

export default function HomePage() {
    return (
        <PageTransition>
            <HomeVideo />
        </PageTransition>
    );
}
