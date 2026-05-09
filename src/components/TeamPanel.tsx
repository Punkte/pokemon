import type { Pokemon } from "../types";

interface TeamPanelProps {
  team: Pokemon[];
  onRemove: (id: number) => void;
}

const MAX_TEAM_SIZE = 6;

export function TeamPanel({ team, onRemove }: TeamPanelProps) {
  const slots = Array.from({ length: MAX_TEAM_SIZE });

  return (
    <aside className="w-72 shrink-0">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm sticky top-6">
        <h2 className="font-bold text-gray-800 text-lg mb-1">Mon équipe</h2>
        <p className="text-xs text-gray-400 mb-4">{team.length} / {MAX_TEAM_SIZE} Pokémon</p>

        <div className="flex flex-col gap-2">
          {slots.map((_, i) => {
            const pokemon = team[i];
            return (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-xl p-2 border transition-colors ${
                  pokemon ? "border-gray-200 bg-gray-50" : "border-dashed border-gray-200"
                }`}
              >
                {pokemon ? (
                  <>
                    <img
                      src={pokemon.sprite}
                      alt={pokemon.name}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="flex-1 capitalize text-sm font-medium text-gray-700">
                      {pokemon.name}
                    </span>
                    <button
                      onClick={() => onRemove(pokemon.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none cursor-pointer"
                      aria-label="Retirer"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-300 px-1">Emplacement {i + 1}</span>
                )}
              </div>
            );
          })}
        </div>

        {team.length === MAX_TEAM_SIZE && (
          <p className="text-xs text-red-400 mt-3 text-center font-medium">
            Équipe complète !
          </p>
        )}
      </div>
    </aside>
  );
}
