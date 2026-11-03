import type {ReactNode} from 'react';
import Admonition from '@theme/Admonition';

type Props = {
  children: ReactNode;
};

/** A "you should now see..." verification step. */
export default function Checkpoint({children}: Props): ReactNode {
  return (
    <Admonition type="success" title="Checkpoint">
      {children}
    </Admonition>
  );
}
