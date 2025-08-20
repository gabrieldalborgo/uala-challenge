import { useState } from 'react';
import { GoToMetrics } from './components/go-to-metrics';
import { Header } from './components/header';
import { Tabs } from './components/tabs';
import { Total, TotalSkeleton } from './components/total';
import { useCollections } from './hooks/use-collections';
import type { Periodicity } from './types';

export function CollectionsSummary() {
  const [periodicity, setPeriodicity] = useState<Periodicity>('weekly');
  const { summary, state } = useCollections({ periodicity });
  return (
    <div className="w-full mt-10 flex flex-col gap-4">
      <div className="flex justify-center">
        <Header />
      </div>
      <div className="flex justify-evenly">
        <Tabs periodicity={periodicity} setPeriodicity={setPeriodicity} />
      </div>
      <div className="flex justify-center">
        {state === 'loading' && <TotalSkeleton />}
        {['empty', 'success'].includes(state) && (
          <Total amount={summary.amount} />
        )}
      </div>
      <div className="flex justify-center">
        <GoToMetrics />
      </div>
    </div>
  );
}
