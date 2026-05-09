import { useEffect, useState } from "react";
import type { PokemonType } from "./types";
import type { DecoratedPokemon } from "./decorator/pokemonDecorators";
import AppConfig from "./config";
import { PokemonApiAdapter } from "./adapter/PokemonApiAdapter";
import { withPowerLevel, withLegendary } from "./decorator/pokemonDecorators";
import { FilterBar } from "./components/FilterBar";
import { PokemonList } from "./components/PokemonList";
import { TeamPanel } from "./components/TeamPanel";

function App() {
  const [pokemons, setPokemons] = useState<DecoratedPokemon[]>([]);
  const [team, setTeam] = useState<DecoratedPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<PokemonType | "all">("all");

  useEffect(() => {
    const adapter = new PokemonApiAdapter();
    setLoading(true);
    adapter.fetchAll().then((data) => {
      setPokemons(data.map((p) => withLegendary(withPowerLevel(p))));
      setLoading(false);
    });
  }, []);

  function handleAdd(pokemon: DecoratedPokemon) {
    if (team.length >= AppConfig.MAX_TEAM_SIZE) return;
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
