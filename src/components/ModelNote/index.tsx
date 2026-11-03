import type {ReactNode} from 'react';
import Admonition from '@theme/Admonition';

type Props = {
  model?: string;
  /** Hardware the demo ran on, so readers can set expectations. */
  hardware?: string;
};

export default function ModelNote({model = 'qwen3.6:27b', hardware}: Props): ReactNode {
  return (
    <Admonition type="note" title="About the model">
      The demo runs on a local Ollama model (<code>{model}</code>
      {hardware ? <> on {hardware}</> : null}). Output varies from run to run and is slower than hosted
      models, so your results will not match the screenshots exactly. Long waits in the video are sped
      up and labelled.
    </Admonition>
  );
}
