import tenantApi from './tenantApi';
import { useTenantBrandingStore } from '@/stores/tenantBranding';
const CACHE_KEY = 'tenantBranding';

export async function getTenantBranding(vuetify) {
    const themeColors = vuetify.theme.themes.value.light.colors;
    const tenantBrandingStore = useTenantBrandingStore();
    //paint instantly from last time's colors avoiding a flash of default colors
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached) {
        themeColors.primary = cached.primary_color;
        themeColors.secondary = cached.secondary_color;
        themeColors.accent = cached.accent_color;
    }
    
    try {
        const response = await tenantApi.get('/branding');
        const branding = response.data.branding;
        themeColors.primary = branding.primary_color;
        themeColors.secondary = branding.secondary_color;
        themeColors.accent = branding.accent_color;
        tenantBrandingStore.setLogo(branding.logo_url);
        localStorage.setItem(CACHE_KEY, JSON.stringify(branding));
    } catch (error) {
        console.error('Failed to fetch tenant branding:', error);
    }

}
