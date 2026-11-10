import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';

// The video scripts are published but only shown in browsers where this flag is set:
//   localStorage.setItem('ojc:showVideoScripts', 'true')
// A head script (docusaurus.config.ts) sets data-video-scripts="on" on <html> before first paint,
// and custom.css hides the sidebar entry otherwise. This module keeps direct visits out.
const KEY = 'ojc:showVideoScripts';

function enabled(): boolean {
  try {
    return window.localStorage.getItem(KEY) === 'true';
  } catch {
    return false;
  }
}

export function onRouteDidUpdate({
  location,
}: {
  location: {pathname: string};
}): void {
  if (!ExecutionEnvironment.canUseDOM) return;
  const prefix = `${siteConfig.baseUrl}learn/video-scripts`;
  if (location.pathname.startsWith(prefix) && !enabled()) {
    window.location.replace(`${siteConfig.baseUrl}learn/intro`);
  }
}
