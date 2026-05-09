export type PokemonType =
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel";

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: PokemonType[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

export interface TeamSlot {
  pokemon: Pokemon;
}
