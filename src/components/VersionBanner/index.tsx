import type {ReactNode} from 'react';
import Admonition from '@theme/Admonition';

type Props = {
  /** OpenJCockpit release or commit this tutorial was tested on. */
  version: string;
};

export default function VersionBanner({version}: Props): ReactNode {
  return (
    <Admonition type="info" title="Tested version">
      This tutorial was tested on OpenJCockpit <code>{version}</code>. OpenJCockpit is in active
      development, so details may differ on other versions.
    </Admonition>
  );
}
