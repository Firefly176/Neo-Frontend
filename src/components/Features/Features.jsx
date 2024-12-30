import EventIcon from "@mui/icons-material/Event";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldIcon from "@mui/icons-material/Shield";

const features = [
  {
    icon: <EventIcon className="text-gray-900 h-8 w-8" />,
    title: "Smart Scheduling",
    description:
      "Plan your crypto transactions in advance with our intuitive calendar interface.",
  },
  {
    icon: <AlarmOnIcon className="text-gray-900 h-8 w-8" />,
    title: "Automated Execution",
    description:
      "Set it and forget it. Our system executes your transactions at the scheduled time.",
  },
  {
    icon: <BoltIcon className="text-gray-900 h-8 w-8" />,
    title: "Real-time Market Data",
    description:
      "Make informed decisions with up-to-the-minute cryptocurrency market information.",
  },
  {
    icon: <ShieldIcon className="text-gray-900 h-8 w-8" />,
    title: "Secure Transactions",
    description:
      "Rest easy knowing your transactions are protected by state-of-the-art security measures.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-gray-100 text-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Crypto Scheduler?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-gray-900 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
