// Central place for all 10 sites.
// You can deploy this exact repo 10 times and only change SITE_KEY.

export type SiteConfig = {
  key: string;
  name: string;
  game: string;
  genre: string;
  tagline: string;
  description: string;
  primaryKeyword: string;
  theme: {
    accent: string;
    accentSoft: string;
    border: string;
    panel: string;
    text: string;
    muted: string;
    background: string;
  };
};

export const SITES: SiteConfig[] = [
  {
    key: "enshrouded-fast-guides",
    name: "Enshrouded Fast Guides",
    game: "Enshrouded",
    genre: "survival RPG",
    tagline: "Fast answers. No fluff.",
    description: "Instant Enshrouded guides, builds, locations, fixes, and progression help.",
    primaryKeyword: "Enshrouded guides",
    theme: {
      accent: "#d4af37",
      accentSoft: "rgba(212,175,55,.14)",
      border: "rgba(212,175,55,.28)",
      panel: "rgba(255,255,255,.05)",
      text: "#f5f2e8",
      muted: "#b9b0a0",
      background: "#0d0d0f"
    }
  },
  {
    key: "manor-lords-fast-guides",
    name: "Manor Lords Fast Guides",
    game: "Manor Lords",
    genre: "city builder",
    tagline: "Build faster. Recover faster.",
    description: "Quick Manor Lords answers for economy, farming, trade, housing, and combat.",
    primaryKeyword: "Manor Lords guides",
    theme: {
      accent: "#d2a56b",
      accentSoft: "rgba(210,165,107,.14)",
      border: "rgba(210,165,107,.28)",
      panel: "rgba(255,255,255,.05)",
      text: "#f5efe6",
      muted: "#c3b4a0",
      background: "#11100d"
    }
  },
  {
    key: "last-epoch-fast-guides",
    name: "Last Epoch Fast Guides",
    game: "Last Epoch",
    genre: "action RPG",
    tagline: "Builds and fixes that get to the point.",
    description: "Quick Last Epoch build help, crafting tips, leveling routes, and performance fixes.",
    primaryKeyword: "Last Epoch guides",
    theme: {
      accent: "#a98bff",
      accentSoft: "rgba(169,139,255,.14)",
      border: "rgba(169,139,255,.28)",
      panel: "rgba(255,255,255,.05)",
      text: "#f1efff",
      muted: "#beb7e7",
      background: "#0f0e16"
    }
  },
  {
    key: "palworld-fast-guides",
    name: "Palworld Fast Guides",
    game: "Palworld",
    genre: "survival monster crafting",
    tagline: "Catch, build, farm, done.",
    description: "Fast Palworld resource guides, breeding help, base locations, and settings fixes.",
    primaryKeyword: "Palworld guides",
    theme: {
      accent: "#4ed6b8",
      accentSoft: "rgba(78,214,184,.14)",
      border: "rgba(78,214,184,.28)",
      panel: "rgba(255,255,255,.05)",
      text: "#ebfffb",
      muted: "#abdfd3",
      background: "#0b1212"
    }
  },
  {
    key: "nightreign-fast-guides",
    name: "Nightreign Fast Guides",
    game: "Elden Ring Nightreign",
    genre: "co-op action",
    tagline: "Boss help without the essay.",
    description: "Fast Elden Ring Nightreign tips for classes, bosses, routes, and co-op survival.",
    primaryKeyword: "Nightreign guides",
    theme: {
      accent: "#c8c16a",
      accentSoft: "rgba(200,193,106,.14)",
      border: "rgba(200,193,106,.28)",
      panel: "rgba(255,255,255,.05)",
      text: "#f7f5df",
      muted: "#cbc89b",
      background: "#12130d"
    }
  },
  {
    key: "diablo4-fast-guides",
    name: "Diablo 4 Fast Guides",
    game: "Diablo 4",
    genre: "action RPG",
    tagline: "Level, farm, optimize.",
    description: "Fast Diablo 4 class, leveling, loot, crafting, and season guides.",
    primaryKeyword: "Diablo 4 guides",
    theme: {
      accent: "#d15a5a",
      accentSoft: "rgba(209,90,90,.14)",
      border: "rgba(209,90,90,.28)",
      panel: "rgba(255,255,255,.05)",
      text: "#ffefef",
      muted: "#d7aaaa",
      background: "#150d0d"
    }
  },
  {
    key: "poe2-fast-guides",
    name: "PoE 2 Fast Guides",
    game: "Path of Exile 2",
    genre: "action RPG",
    tagline: "Craft better. Die less.",
    description: "Fast Path of Exile 2 build, currency, gem, and progression answers.",
    primaryKeyword: "PoE 2 guides",
    theme: {
      accent: "#76b2ff",
      accentSoft: "rgba(118,178,255,.14)",
      border: "rgba(118,178,255,.28)",
      panel: "rgba(255,255,255,.05)",
      text: "#eef6ff",
      muted: "#acc9e8",
      background: "#0c1015"
    }
  },
  {
    key: "kingdom-come-2-fast-guides",
    name: "Kingdom Come 2 Fast Guides",
    game: "Kingdom Come Deliverance 2",
    genre: "open-world RPG",
    tagline: "Quests, combat, and money—faster.",
    description: "Fast Kingdom Come Deliverance 2 tips for quests, combat, gear, and money-making.",
    primaryKeyword: "Kingdom Come Deliverance 2 guides",
    theme: {
      accent: "#d3ba92",
      accentSoft: "rgba(211,186,146,.14)",
      border: "rgba(211,186,146,.28)",
      panel: "rgba(255,255,255,.05)",
      text: "#f9f5ef",
      muted: "#cdbfa9",
      background: "#120f0d"
    }
  },
  {
    key: "monster-hunter-wilds-fast-guides",
    name: "Monster Hunter Wilds Fast Guides",
    game: "Monster Hunter Wilds",
    genre: "action hunting RPG",
    tagline: "Hunt smarter. Gear faster.",
    description: "Fast Monster Hunter Wilds guides for weapons, monsters, armor, and farming routes.",
    primaryKeyword: "Monster Hunter Wilds guides",
    theme: {
      accent: "#7ecb71",
      accentSoft: "rgba(126,203,113,.14)",
      border: "rgba(126,203,113,.28)",
      panel: "rgba(255,255,255,.05)",
      text: "#f1fff0",
      muted: "#b3d7af",
      background: "#0d140d"
    }
  },
  {
    key: "windrose-fast-guides",
    name: "Windrose Fast Guides",
    game: "Windrose",
    genre: "survival crafting",
    tagline: "Sail, build, survive.",
    description: "Fast Windrose guides for resources, boats, progression, combat, and fixes.",
    primaryKeyword: "Windrose guides",
    theme: {
      accent: "#6dc1d8",
      accentSoft: "rgba(109,193,216,.14)",
      border: "rgba(109,193,216,.28)",
      panel: "rgba(255,255,255,.05)",
      text: "#eefcff",
      muted: "#add6df",
      background: "#0b1114"
    }
  }
];

export function getSiteByKey(key?: string) {
  return SITES.find((site) => site.key === key) ?? SITES[0];
}