"use client";

const categories = [
  "Barchasi",
  "Ekskavator",
  "Pogruzchik",
  "Forklift",
];

type Props = {
  selected: string;
  setSelected: (value: string) => void;
};

export default function CategoryFilter({
  selected,
  setSelected,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-10">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-5 py-3 rounded-2xl transition-all duration-300 ${
            selected === category
              ? "bg-green-500 text-white"
              : "bg-[#102E1C] text-white/70 hover:bg-white/10"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}