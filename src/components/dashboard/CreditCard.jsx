import { BookOpen } from 'lucide-react';
import StatsCard from './StatsCard';

export default function CreditCard({ value, hint }) {
  return <StatsCard icon={BookOpen} label="Total Credits Earned" value={value} hint={hint} />;
}
