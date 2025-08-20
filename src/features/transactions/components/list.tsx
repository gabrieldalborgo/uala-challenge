import { Item, ItemSkeleton } from './item';
import type { Transaction } from '../types';

interface ListProps {
  items: Transaction[];
}

export function List({ items }: ListProps) {
  return items.map(item => <Item key={item.id} {...item} />);
}

export function ListSkeleton({ count }: { count: number }) {
  return Array.from({ length: count }).map((_, index) => (
    <ItemSkeleton key={index} />
  ));
}
