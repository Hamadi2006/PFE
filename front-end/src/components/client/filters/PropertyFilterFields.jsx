export function FilterSection({ title, children }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold mb-3 text-gray-800 dark:text-white">
        {title}
      </label>
      {children}
    </div>
  );
}

export function NumberRangeFilter({
  maxValue,
  minValue,
  onMaxChange,
  onMinChange,
  placeholderMax,
  placeholderMin,
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <input
        type="number"
        value={minValue}
        onChange={(event) => onMinChange(event.target.value)}
        placeholder={placeholderMin}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
      />
      <input
        type="number"
        value={maxValue}
        onChange={(event) => onMaxChange(event.target.value)}
        placeholder={placeholderMax}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
      />
    </div>
  );
}

export function ToggleButtonGroup({ options, selectedValues, onToggle }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {options.map((value) => {
        const selected = selectedValues.includes(value);

        return (
          <button
            key={value}
            onClick={() => onToggle(value)}
            className={`px-3 py-2 border rounded-lg text-sm transition ${
              selected
                ? "bg-cyan-600 text-white border-cyan-600"
                : "border-gray-300 dark:border-gray-600 hover:bg-cyan-600 hover:text-white dark:text-gray-300"
            }`}
            type="button"
          >
            {value}+
          </button>
        );
      })}
    </div>
  );
}

export function SelectFilter({ value, options, onChange, getLabel }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 focus:ring-2 focus:ring-cyan-600 focus:outline-none"
    >
      {options.map((option) => (
        <option key={option.value || "all"} value={option.value}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}

export function AmenityCheckboxGroup({
  amenities,
  options,
  onToggle,
  getLabel,
}) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={amenities?.[option.value] || false}
            onChange={() => onToggle(option.value)}
            className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-600"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {getLabel(option)}
          </span>
        </label>
      ))}
    </div>
  );
}
