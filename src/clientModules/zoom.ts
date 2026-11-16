import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Click-to-zoom lightbox for Mermaid diagrams and images inside docs content.
// Uses event delegation because Mermaid renders its SVG asynchronously after route changes.
// Controls: wheel / pinch / +/- buttons zoom, drag pans, double-click or "1:1" resets, Esc or backdrop closes.

const TARGETS = '.markdown .docusaurus-mermaid-container, .markdown img';
const MIN = 0.5;
const MAX = 8;

function open(source: Element): void {
  const clone = source.cloneNode(true) as HTMLElement | SVGElement;
  if (clone instanceof SVGElement || clone.tagName === 'DIV') {
    // Let the SVG scale freely inside the stage instead of the page column width.
    const svg = clone.tagName.toLowerCase() === 'svg' ? clone : clone.querySelector('svg');
    if (svg) {
      svg.removeAttribute('style');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
    }
  }

  const overlay = document.createElement('div');
  overlay.className = 'ojc-zoom-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Zoomed view');

  const stage = document.createElement('div');
  stage.className = 'ojc-zoom-stage';
  stage.appendChild(clone);

  const bar = document.createElement('div');
  bar.className = 'ojc-zoom-bar';
  const mk = (label: string, text: string, fn: () => void) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = text;
    b.setAttribute('aria-label', label);
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      fn();
    });
    bar.appendChild(b);
  };

  let scale = 1;
  let x = 0;
  let y = 0;
  const apply = () => {
    stage.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  };
  const zoomBy = (f: number) => {
    scale = Math.min(MAX, Math.max(MIN, scale * f));
    apply();
  };
  const reset = () => {
    scale = 1;
    x = 0;
    y = 0;
    apply();
  };
  const close = () => {
    document.removeEventListener('keydown', onKey);
    document.body.classList.remove('ojc-zoom-open');
    overlay.remove();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close();
    else if (e.key === '+' || e.key === '=') zoomBy(1.25);
    else if (e.key === '-') zoomBy(0.8);
    else if (e.key === '0') reset();
  };

  mk('Zoom out', '−', () => zoomBy(0.8));
  mk('Zoom in', '+', () => zoomBy(1.25));
  mk('Reset zoom', '1:1', reset);
  mk('Close', '✕', close);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  overlay.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 1.1 : 1 / 1.1);
    },
    {passive: false},
  );
  overlay.addEventListener('dblclick', reset);

  // Pointer drag to pan; two-pointer pinch to zoom.
  const pointers = new Map<number, {x: number; y: number}>();
  let pinchDist = 0;
  overlay.addEventListener('pointerdown', (e) => {
    if ((e.target as HTMLElement).closest('.ojc-zoom-bar')) return;
    overlay.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
    }
  });
  overlay.addEventListener('pointermove', (e) => {
    const prev = pointers.get(e.pointerId);
    if (!prev) return;
    pointers.set(e.pointerId, {x: e.clientX, y: e.clientY});
    if (pointers.size === 1) {
      x += e.clientX - prev.x;
      y += e.clientY - prev.y;
      apply();
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchDist) zoomBy(d / pinchDist);
      pinchDist = d;
    }
  });
  const end = (e: PointerEvent) => {
    pointers.delete(e.pointerId);
    pinchDist = 0;
  };
  overlay.addEventListener('pointerup', end);
  overlay.addEventListener('pointercancel', end);

  overlay.append(stage, bar);
  document.body.appendChild(overlay);
  document.body.classList.add('ojc-zoom-open');
  document.addEventListener('keydown', onKey);
  (bar.lastElementChild as HTMLButtonElement).focus();
}

if (ExecutionEnvironment.canUseDOM) {
  document.addEventListener('click', (e) => {
    const t = (e.target as Element | null)?.closest?.(TARGETS);
    if (!t || t.closest('a, button')) return;
    if (document.body.classList.contains('ojc-zoom-open')) return;
    open(t.tagName === 'IMG' ? t : t.querySelector('svg') ?? t);
  });
}
