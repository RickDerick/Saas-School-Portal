<template>
    <v-main>
        <v-container class="py-10" fluid>
            <div class="d-flex align-center mb-4">
                <v-btn
                    prepend-icon="mdi-arrow-left"
                    variant="outlined"
                    class="mr-6"
                    :to="dashboardRoute"
                >Back</v-btn>
                <span class="text-h6 font-weight-medium">Settings</span>
            </div>

            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="5" style="max-width: 420px;">
                            <h2 class="text-subtitle-1 font-weight-medium mb-1">Change Email</h2>
                            <p class="text-body-2 text-medium-emphasis mb-4">
                                Update the email address you use to sign in.
                            </p>

                            <v-form @submit.prevent="submitEmail">
                                <v-text-field
                                    v-model="emailForm.email"
                                    label="New email"
                                    type="email"
                                    class="mb-2"
                                    variant="outlined"
                                    required
                                />
                                <v-text-field
                                    v-model="emailForm.current_password"
                                    label="Current password"
                                    :type="showEmailPassword ? 'text' : 'password'"
                                    :append-inner-icon="showEmailPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="showEmailPassword = !showEmailPassword"
                                    variant="outlined"
                                    required
                                />

                                <v-btn type="submit" color="primary" class="mt-2" :loading="submittingEmail">
                                    Update Email
                                </v-btn>
                            </v-form>
                        </v-col>

                        <div class="d-none d-md-flex flex-column align-center mx-4" style="align-self: stretch;">
                            <v-divider vertical style="flex: 1;" />
                            <span class="text-caption text-medium-emphasis my-2">OR</span>
                            <v-divider vertical style="flex: 1;" />
                        </div>

                        <div class="d-flex d-md-none align-center my-4" style="width: 100%;">
                            <v-divider style="flex: 1;" />
                            <span class="text-caption text-medium-emphasis mx-2">OR</span>
                            <v-divider style="flex: 1;" />
                        </div>

                        <v-col cols="12" md="5" style="max-width: 420px;">
                            <h2 class="text-subtitle-1 font-weight-medium mb-1">Change Password</h2>
                            <p class="text-body-2 text-medium-emphasis mb-4">
                                Choose a new password for your account.
                            </p>

                            <v-form @submit.prevent="submitPassword">
                                <v-text-field
                                    v-model="passwordForm.current_password"
                                    label="Current password"
                                    :type="showCurrentPassword ? 'text' : 'password'"
                                    :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="showCurrentPassword = !showCurrentPassword"
                                    class="mb-2"
                                    variant="outlined"
                                    required
                                />
                                <v-text-field
                                    v-model="passwordForm.password"
                                    label="New password"
                                    :type="showNewPassword ? 'text' : 'password'"
                                    :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="showNewPassword = !showNewPassword"
                                    class="mb-2"
                                    variant="outlined"
                                    required
                                />
                                <v-text-field
                                    v-model="passwordForm.password_confirmation"
                                    label="Confirm new password"
                                    :type="showNewPasswordConfirmation ? 'text' : 'password'"
                                    :append-inner-icon="showNewPasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append-inner="showNewPasswordConfirmation = !showNewPasswordConfirmation"
                                    variant="outlined"
                                    required
                                />

                                <v-btn type="submit" color="primary" class="mt-2" :loading="submittingPassword">
                                    Update Password
                                </v-btn>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-container>
    </v-main>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { useSuperAdminAuthStore } from '@/stores/superAdmin';
import { useTenantStore } from '@/stores/tenant';

const superAdminAuthStore = useSuperAdminAuthStore();
const tenantAuthStore = useTenantStore();

// The settings page is shared by both audiences — whichever store is
// currently authenticated owns the profile being edited.
const activeStore = computed(() =>
    superAdminAuthStore.isAuthenticated ? superAdminAuthStore : tenantAuthStore
);

const dashboardRoute = computed(() =>
    superAdminAuthStore.isAuthenticated
        ? { name: 'SuperAdminDashboard' }
        : { name: 'TenantDashboard' }
);

const emailForm = reactive({ email: '', current_password: '' });
const submittingEmail = ref(false);
const showEmailPassword = ref(false);

const passwordForm = reactive({ current_password: '', password: '', password_confirmation: '' });
const submittingPassword = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showNewPasswordConfirmation = ref(false);

async function submitEmail() {
    submittingEmail.value = true;

    try {
        await activeStore.value.updateEmail({ ...emailForm });
        emailForm.email = '';
        emailForm.current_password = '';
    } catch (e) {
    } finally {
        submittingEmail.value = false;
    }
}

async function submitPassword() {
    submittingPassword.value = true;

    try {
        await activeStore.value.updatePassword({ ...passwordForm });
        passwordForm.current_password = '';
        passwordForm.password = '';
        passwordForm.password_confirmation = '';
    } catch (e) {
    } finally {
        submittingPassword.value = false;
    }
}
</script>
