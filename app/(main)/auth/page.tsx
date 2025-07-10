'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import NotFound from '@/components/notFound';
import AuthComp from '@/components/signin';

export default function AuthPage() {
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
