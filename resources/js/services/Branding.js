import tenantApi from './tenantApi';
import { useTenantBrandingStore } from '@/stores/tenantBranding';

export async function getTenantBranding(vuetify) {
    const themeColors = vuetify.theme.themes.value.light.colors;
    const tenantBrandingStore = useTenantBrandingStore();

    //paint instantly from last time's colors avoiding a flash of default colors
    if (tenantBrandingStore.primaryColor) {
        themeColors.primary = tenantBrandingStore.primaryColor;
        themeColors.secondary = tenantBrandingStore.secondaryColor;
        themeColors.accent = tenantBrandingStore.accentColor;
    }

    try {
        const response = await tenantApi.get('/branding');
        const branding = response.data.branding;
        themeColors.primary = branding.primary_color;
        themeColors.secondary = branding.secondary_color;
        themeColors.accent = branding.accent_color;
        tenantBrandingStore.setBranding(branding);
    } catch (error) {
        console.error('Failed to fetch tenant branding:', error);
    }
}
