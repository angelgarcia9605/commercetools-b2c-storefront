'use client';

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
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-primary mb-6">Filters</h2>

      {Object.entries(facets).map(([facetName, options]) => (
        <div key={facetName} className="mb-6 pb-6 border-b last:border-b-0">
          <h3 className="text-lg font-semibold text-primary mb-4">{facetName}</h3>
          <div className="space-y-3">
            {options.map((option) => {
              const isChecked = selectedFacets[facetName]?.includes(option.value) || false;
              return (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) =>
                      onFacetChange(facetName, option.value, e.target.checked)
                    }
                    className="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary"
                  />
                  <span className="ml-3 text-gray-700 text-sm">
                    {option.label}
                    {option.count && (
                      <span className="text-gray-500 ml-2">({option.count})</span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
