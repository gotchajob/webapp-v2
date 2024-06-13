'use client';

import { useRefresh } from 'hooks/use-refresh';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const { refreshTime, refresh } = useRefresh();
  return (
    <div>
      <button onClick={refresh}>hello</button>
      {refreshTime}
      {children}
    </div>
  );
}
