import React, { useState } from 'react';

const files = {
  childrenEntries: [
    { name: 'node_modules', childrenEntries: [{ name: 'joi' }] },
    { name: 'package.json' },
    { name: 'vite.config.js' },
  ],
};
interface Item {
  name: string;
  childrenEntries?: Item[];
  level?: number;
}
const Entry = ({ name, childrenEntries, level }: Item) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      {childrenEntries?.length && (
        <button onClick={() => setIsExpanded((prev) => !prev)}>
          {isExpanded ? '-' : '+'}
        </button>
      )}{' '}
      {name}
      {isExpanded
        ? childrenEntries?.map((c) => <Entry {...c} level={level + 1} />)
        : null}
    </div>
  );
};
export default function TreeStructureDisplay() {
  return (
    <div>
      {files.childrenEntries.map((f) => {
        return <Entry {...f} level={0} />;
      })}
    </div>
  );
}
