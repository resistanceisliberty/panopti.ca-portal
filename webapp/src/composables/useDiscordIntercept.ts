import { ref } from 'vue';

export function useDiscordIntercept() {
  const showDialog = ref(false);
  const discordUrl = ref('');

  function interceptDiscordLinks() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      let link: HTMLAnchorElement | null = null;
      if (target.tagName === 'A') {
        link = target as HTMLAnchorElement;
      } else {
        link = target.closest('a');
      }
      if (!link) return;
      // .href is a plain string on HTML anchors, but an SVGAnimatedString
      // object (no .includes) on SVG <a> elements like the candidates map
      // dots — closest('a') can return either. Normalize before reading it.
      const href = typeof link.href === 'string' ? link.href : link.getAttribute('href') ?? '';
      if (href && (href.includes('discord.gg') || href.includes('discord.com'))) {
        e.preventDefault();
        discordUrl.value = href;
        showDialog.value = true;
      }
    }, true);
  }

  return { showDialog, discordUrl, interceptDiscordLinks };
}
