<template>
    <div class="md-layout md-alignment-center-center" style="height: 100vh;">
        <md-card class="md-layout-item md-size-50">
            <md-card-header>
                <div class="md-title">Login</div>
            </md-card-header>

            <form @submit.prevent="validateForm">
                <md-card-content>
                    <md-field md-clearable :class="getValidationClass('email')">
                        <label for="email">Email</label>
                        <md-input :disabled="loading" type="email" name="email" id="email" autocomplete="email" v-model="form.email" />
                        <span class="md-error" v-if="!$v.form.email.required">
                            The Email is required!
                        </span>
                        <span class="md-error" v-else-if="!$v.form.email.email">
                            Invalid Email 
                        </span>
                    </md-field>
                    <md-field :class="getValidationClass('password')">
                        <label for="password">Password</label>
                        <md-input :disabled="loading" type="password" name="password" id="password" autocomplete="password" v-model="form.password" />
                        <span class="md-error" v-if="!$v.form.password.required">
                            The Password is required!
                        </span>
                        <span class="md-error" v-else-if="!$v.form.password.minLength">
                            The Password must be at least 6 character
                        </span>
                        <span class="md-error" v-else-if="!$v.form.password.maxLength">
                            The Password must be at most 20 character
                        </span>
                    </md-field>
                </md-card-content>

                <md-card-actions>
                    <md-button to="/register">Go to Register</md-button>
                    <md-button class="md-primary md-raised" :disabled="loading" type="submit">Submit</md-button>
                </md-card-actions>
            </form>

            <md-snackbar :md-active.sync="isAuthenticated">
                {{ form.email }} was successfully Logged In!
            </md-snackbar>
        </md-card>

        <!-- Back Button -->
        <md-button class="md-fixed md-fab-bottom-right md-fab md-primary" @click="$router.go(-1)">
            <md-icon>arrow_back</md-icon>
        </md-button>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';
export default {
    middleware: 'auth',
    mixins: [validationMixin],
    data() {
        return {
            form: {
                email: '',
                password: '',
            }
        }
    },
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20),
            }
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading;
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    watch: {
        isAuthenticated(val) {
            if(val) {
                setTimeout(() => this.$router.push('/'), 2000);
            }
        }
    },
    methods: {
        validateForm() {
            this.$v.$touch();
            if(!this.$v.$invalid) {
                this.loginUser();
            }
        },
        async loginUser() {
            await this.$store.dispatch('authenticateUser', {
                action: 'login',
                email: this.form.email,
                password: this.form.password,
                returnSecureToken: true,
            });
        },
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName];
            if(field) {
                return {
                    "md-invalid": field.$invalid && field.$dirty
                }
            }
        }
    },
}
</script>