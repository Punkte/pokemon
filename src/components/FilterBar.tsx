import type { PokemonType } from "../types";

const TYPES: PokemonType[] = [
  "fire", "water", "grass", "electric", "psychic", "ice",
  "dragon", "dark", "fairy", "normal", "fighting", "flying",
  "poison", "ground", "rock", "bug", "ghost", "steel",
];

interface FilterBarProps {
  selectedType: PokemonType | "all";
  onTypeChange: (type: PokemonType | "all") => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export function FilterBar({ selectedType, onTypeChange, search, onSearchChange }: FilterBarProps) {
  return (
    <div className="flex gap-3 items-center flex-wrap mb-6">
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 w-52"
      />
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value as PokemonType | "all")}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 capitalize"
      >
        <option value="all">Tous les types</option>
        {TYPES.map((t) => (
          <option key={t} value={t} className="capitalize">
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
