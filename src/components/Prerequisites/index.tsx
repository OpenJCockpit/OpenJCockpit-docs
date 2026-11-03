import type {ReactNode} from 'react';
import Admonition from '@theme/Admonition';

type Props = {
  items: ReactNode[];
};

export default function Prerequisites({items}: Props): ReactNode {
  return (
    <Admonition type="tip" title="Prerequisites">
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Admonition>
  );
}
