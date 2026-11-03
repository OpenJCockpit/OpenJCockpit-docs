import type {ReactNode} from 'react';
import Admonition from '@theme/Admonition';

export default function LocalOnlyWarning(): ReactNode {
  return (
    <Admonition type="warning" title="Local development only">
      The seeded credentials shown here exist only in the local Docker Compose stack. Never use them,
      or any secret from this page, in a shared or production environment.
    </Admonition>
  );
}
