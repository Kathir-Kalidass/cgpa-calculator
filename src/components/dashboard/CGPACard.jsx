import { TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';

export default function CGPACard({ value, hint }) {
  return <StatsCard icon={TrendingUp} label="Current CGPA" value={value} hint={hint} />;
}
