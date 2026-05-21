import {
  DollarSign,
  Truck,
  ShoppingCart,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Daromad",
    value: "120M",
    icon: DollarSign,
  },
  {
    title: "Texnikalar",
    value: "24",
    icon: Truck,
  },
  {
    title: "Buyurtmalar",
    value: "86",
    icon: ShoppingCart,
  },
  {
    title: "Operatorlar",
    value: "12",
    icon: Users,
  },
];

export default function AdminStats() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-[#102E1C] border border-white/10 rounded-3xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/50">
                  {item.title}
                </p>

                <h2 className="text-4xl font-black mt-3">
                  {item.value}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <Icon
                  size={28}
                  className="text-green-400"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}