import PageFadeTransition from '@/components/PageFadeTransition';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageFadeTransition key={typeof window !== 'undefined' ? window.location.pathname : undefined}>
      {children}
    </PageFadeTransition>
  );
}
