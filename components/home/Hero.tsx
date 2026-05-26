import Button from "../ui/Button";
import Container from "../shared/Container";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="relative py-24 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
              Og‘ir texnikalar ijarasi
            </span>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mt-6">
              Master
              <span className="text-green-500">Laser</span>
            </h1>

            <p className="text-white/60 text-lg mt-6 leading-relaxed">
              Excavator, buldozer, forklift va boshqa texnikalarni
              online ijaraga oling.
            </p>

            <div className="flex items-center gap-4 mt-8">
             <Link href="/equipment">
  <Button>
    Texnika tanlash
  </Button>
</Link>
              <Link href="#contact">
  <Button className="bg-white/10 hover:bg-white/20">
    Bog‘lanish
  </Button>
</Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-green-500 blur-[120px] opacity-20" />

            <img
              src="https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=1200&auto=format&fit=crop"
              alt="excavator"
              className="relative rounded-3xl border border-green-500/20"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}