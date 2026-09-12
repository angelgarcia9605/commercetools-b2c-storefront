'use client';

import { useState } from 'react';

interface FacetOption {
  label: string;
  value: string;
  count?: number;
}

interface FacetsProps {
  facets: Record<string, FacetOption[]>;
  selectedFacets: Record<string, string[]>;
  onFacetChange: (facetName: string, value: string, checked: boolean) => void;
}

export default function Facets({
  facets,
  selectedFacets,
  onFacetChange,
}: FacetsProps) {
  const [expandedFacets, setExpandedFacets] = useState<Set<string>>(new Set());

  const toggleFacet = (facetName: string) => {
    const newExpanded = new Set(expandedFacets);
    if (newExpanded.has(facetName)) {
      newExpanded.delete(facetName);
    } else {
      newExpanded.add(facetName);
    }
    setExpandedFacets(newExpanded);
  };

  return (
    <aside className="bg-white rounded-lg shadow-md p-6 h-fit">
      <h2 className="text-lg font-bold text-primary mb-4">Filters</h2>

      {Object.entries(facets).map(([facetName, options]) => (
        <div key={facetName} className="mb-6 border-b pb-4">
          <button
            onClick={() => toggleFacet(facetName)}
            className="w-full flex justify-between items-center font-semibold text-primary hover:text-secondary transition"
          >
            {facetName}
            <span>{expandedFacets.has(facetName) ? '−' : '+'}</span>
          </button>

          {expandedFacets.has(facetName) && (
            <div className="mt-3 space-y-2">
              {options.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFacets[facetName]?.includes(option.value) || false}
                    onChange={(e) =>
                      onFacetChange(facetName, option.value, e.target.checked)
                    }
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">
                    {option.label}
                    {option.count && (
                      <span className="text-gray-500 ml-1">({option.count})</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
