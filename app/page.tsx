import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/home/Hero";
import EquipmentList from "@/components/home/EquipmentList";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <EquipmentList />
    </main>
  );
}