import { useAuth } from '@/context/AuthContext';
import { calculateSubscriptionMetrics, subscriptions } from '@/utils';
import {
  FaCheck,
  FaCheckDouble,
  FaStar,
  FaBolt,
  FaGift,
  FaFire,
  FaDollarSign,
  FaFileInvoiceDollar,
  FaChartLine,
  FaMoneyBillWave,
} from 'react-icons/fa';

export default function SubscriptionSummary() {
  const { userData } = useAuth();

  const summary = calculateSubscriptionMetrics(userData.subscriptions);
  console.log(summary);

  const emojis = [
    '🔥',
    '✅',
    '⭐️',
    '⚡️',
    '🎉',
    '✨',
    '🏆',
    '🌼',
    '🌱',
    '🐛',
    '🐙',
    '🪼',
  ];

  const icons = [
    <FaDollarSign />,
    <FaFileInvoiceDollar />,
    <FaChartLine />,
    <FaBolt />,
    <FaStar />,
    <FaMoneyBillWave />,
    <FaFire />,
  ];

  return (
    <section>
      <h2>Subscription Analytics</h2>
      <div className="analytics-card">
        {Object.keys(summary).map((metric, metricIndex) => {
          return (
            <div key={metricIndex} className="analytics-item">
              <p>
                {icons[metricIndex]} {metric.replaceAll('_', ' ')}
              </p>
              <h4>{summary[metric]}</h4>
            </div>
          );
        })}
      </div>
    </section>
  );
}
