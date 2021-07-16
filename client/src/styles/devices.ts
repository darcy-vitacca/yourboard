import { theme } from './theme';

export const device = {
    mobileSml: `(min-width: ${theme.mQ.mobileSml}px)`,
    mobileMed: `(min-width: ${theme.mQ.mobileMed}px)`,
    mobileLrg: `(min-width: ${theme.mQ.mobileLrg}px)`,
    tablet: `(min-width: ${theme.mQ.tablet}px)`,
    laptop: `(min-width: ${theme.mQ.laptop}px)`,
    laptopLrg: `(min-width: ${theme.mQ.laptopLrg}px)`,
    desktopSml: `(min-width: ${theme.mQ.desktopSml}px)`,
    desktop: `(min-width: ${theme.mQ.desktop}px)`,
};
