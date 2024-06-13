'use client';

import { useRefresh } from 'hooks/use-refresh';

export default function Page() {
  const { refreshTime } = useRefresh();
  return <div>{refreshTime}</div>;
}
