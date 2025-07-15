'use client'; // 👈 MUST be the first line — even before imports

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import NotFound from '@/components/notFound';
import AuthComp from '@/components/signin';

function AuthPageInner() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get('mode');

  const [mode, setMode] = useState<'signin' | 'signup' | null>(null);

  useEffect(() => {
    if (modeParam === 'signin' || modeParam === 'signup') {
      setMode(modeParam);
    } else {
      setMode(null);
    }
  }, [modeParam]);

  if (mode === null) {
    return <NotFound />;
  }

  return <AuthComp mode={mode} />;
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageInner />
    </Suspense>
  );
}
