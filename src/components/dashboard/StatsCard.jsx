import Card from '../common/Card';

export default function StatsCard({ icon: Icon, label, value, hint }) {
  return (
    <Card className="stat-card">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{hint}</small>
      </div>
      {Icon ? <Icon size={34} /> : null}
    </Card>
  );
}
