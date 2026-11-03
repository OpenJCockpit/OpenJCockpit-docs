// Mermaid calls selection.transition() for tooltips. d3-transition patches that method onto
// d3-selection as a side effect, which the bundler can drop. Import it explicitly so it is kept.
import 'd3-transition';
