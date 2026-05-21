import Navbar from "@/components/shared/Navbar";
import Container from "@/components/shared/Container";

export default function Loading() {
  return (
    <main>
      <Navbar />

      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            <div className="bg-[#102E1C] h-[500px] rounded-3xl" />

            <div>
              <div className="flex gap-4">
                <div className="bg-[#102E1C] h-10 w-32 rounded-full" />
                <div className="bg-[#102E1C] h-10 w-40 rounded-full" />
              </div>

              <div className="bg-[#102E1C] h-16 w-72 rounded-xl mt-8" />

              <div className="bg-[#102E1C] h-6 w-48 rounded-xl mt-6" />

              <div className="space-y-4 mt-10">
                <div className="bg-[#102E1C] h-5 rounded-xl" />
                <div className="bg-[#102E1C] h-5 rounded-xl" />
                <div className="bg-[#102E1C] h-5 w-3/4 rounded-xl" />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-10">
                <div className="bg-[#102E1C] h-32 rounded-2xl" />
                <div className="bg-[#102E1C] h-32 rounded-2xl" />
                <div className="bg-[#102E1C] h-32 rounded-2xl" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}