import { listSubmissions } from '@/lib/emodul-store';
import { HomePortal } from '@/components/HomePortal';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const submissions = await listSubmissions();
  return <HomePortal initialSubmissions={submissions} />;
}
