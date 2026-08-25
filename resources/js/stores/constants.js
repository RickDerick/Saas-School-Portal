// Keep in sync with config/tenancy.php's `central_domains`
export const CENTRAL_HOSTNAMES = ['127.0.0.1', 'localhost'];

export function isCentralDomain(hostname = window.location.hostname) {
    return CENTRAL_HOSTNAMES.includes(hostname);
}

export const CentralUrls = {
    //central routes
    login: 'central/login',
    forgotPassword: 'central/forgot-password',
    resetPassword: 'central/reset-password',
    tenants: 'central/tenants',
    profileEmail: 'central/profile/email',
    profilePassword: 'central/profile/password',
}

export const TenantUrls = {
    //tenant routes (relative to the tenant's own domain)
    login: 'login',
    register: 'register',
    profileEmail: 'profile/email',
    profilePassword: 'profile/password',
}
