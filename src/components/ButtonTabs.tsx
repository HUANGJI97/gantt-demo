import { useEffect, useState } from "react";

interface ButtonTabsProps<T = string> {
  items: {
    value: T;
    label: string;
  }[];
  onChange: (value: T) => void;
  value: T;
}
const ButtonTabs = <T = string,>({
  items = [],
  value,
  onChange,
}: ButtonTabsProps<T>) => {
  const [val, setVal] = useState<T>(value);
  function handleClick(item: ButtonTabsProps<T>["items"][0]) {
    setVal(item.value);
    onChange(item.value);
  }
  useEffect(() => setVal(value), [value]);
  return (
    <div className="button-tabs">
      {items.map((item) => (
        <div
          key={`${item.value}`}
          onClick={() => handleClick(item)}
          className={`item ${item.value === val ? "active" : ""}`}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
export default ButtonTabs;
