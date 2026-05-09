import { useEffect, useState } from "react";
import type { Pokemon, PokemonType } from "./types";
import { FilterBar } from "./components/FilterBar";
import { PokemonList } from "./components/PokemonList";
import { TeamPanel } from "./components/TeamPanel";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<PokemonType | "all">("all");

  useEffect(() => {
    setLoading(true);

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => {
        const requests = data.results.map((entry: { url: string }) =>
          fetch(entry.url).then((r) => r.json())
        );

        Promise.all(requests).then((details) => {
          const parsed: Pokemon[] = details.map((d) => ({
            id: d.id,
            name: d.name,
            sprite: d.sprites.front_default,
            types: d.types.map((t: { type: { name: string } }) => t.type.name),
            stats: {
              hp: d.stats[0].base_stat,
              attack: d.stats[1].base_stat,
              defense: d.stats[2].base_stat,
              speed: d.stats[5].base_stat,
            },
          }));

          setPokemons(parsed);
          setLoading(false);
        });
      });
  }, []);

  function handleAdd(pokemon: Pokemon) {
    if (team.length >= 6) return;
    if (team.find((p) => p.id === pokemon.id)) return;
    setTeam([...team, pokemon]);
  }

  function handleRemove(id: number) {
    setTeam(team.filter((p) => p.id !== id));
  }

  const filtered = pokemons.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "all" || p.types.includes(selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-500 text-white px-8 py-4 shadow">
        <h1 className="text-2xl font-bold tracking-tight">Pokémon Team Builder</h1>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        <div className="flex-1 min-w-0">
          <FilterBar
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            search={search}
            onSearchChange={setSearch}
          />

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-400 animate-pulse">Chargement des Pokémon...</p>
            </div>
          ) : (
            <PokemonList
              pokemons={filtered}
              teamIds={team.map((p) => p.id)}
              onAdd={handleAdd}
            />
          )}
        </div>

        <TeamPanel team={team} onRemove={handleRemove} />
      </main>
    </div>
  );
}

export default App;
