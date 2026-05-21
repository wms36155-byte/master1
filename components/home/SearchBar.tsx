"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="mb-10">
      <input
        type="text"
        placeholder="Texnika qidirish..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#102E1C] border border-white/10 focus:border-green-500 outline-none rounded-2xl px-6 py-4 text-white"
      />
    </div>
  );
}