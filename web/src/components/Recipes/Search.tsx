"use client";

import { Icon } from "@iconify/react";
import { Input } from "@heroui/react";
import { FC } from "react";

interface RecipeSearchProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

const RecipeSearch: FC<RecipeSearchProps> = ({ onSearch, searchQuery }) => {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <Input
        type="text"
        placeholder="Suche nach Rezepten oder Zutaten..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        startContent={
          <Icon icon="solar:magnifer-bold" className="text-gray-400 h-5 w-5" />
        }
        endContent={
          searchQuery && (
            <button
              onClick={() => onSearch("")}
              className="text-gray-400 hover:text-gray-600"
            >
              <Icon icon="solar:close-circle-bold" className="h-5 w-5" />
            </button>
          )
        }
        className="h-12"
        classNames={{
          inputWrapper:
            "bg-white border-gray-300 hover:border-emerald-500 focus-within:border-emerald-500",
        }}
      />
    </div>
  );
};

export default RecipeSearch;
