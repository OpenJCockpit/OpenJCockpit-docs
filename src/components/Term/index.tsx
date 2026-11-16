import type {ReactNode} from 'react';
import useBrokenLinks from '@docusaurus/useBrokenLinks';

// Glossary term with a linkable anchor. Registers the id with Docusaurus so the
// broken-anchor check accepts links such as /learn/concepts/glossary#opa.
export default function Term({id, children}: {id: string; children: ReactNode}) {
  useBrokenLinks().collectAnchor(id);
  return <strong id={id}>{children}</strong>;
}
