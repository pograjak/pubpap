<template>
  <div class="text-center">
    <v-dialog v-model="modalState" width="50%">
      <v-card>
        <v-tabs v-model="tab">
          <v-tab key="Login">
            Login
          </v-tab>
          <v-tab key="Register">
            Register
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item key="Login">
            <v-card>
              <v-form>
                <v-card-text>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                  />

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click.prevent="login">
                    Login
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-tab-item>
          <v-tab-item key="Register">
            <v-card>
              <v-form lazy-validation="true">
                <v-card-text>
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                  />
                  <v-select
                    :items="position"
                    v-model="select"
                    prepend-icon="mdi-email"
                    label="Position"
                    name="position"
                  ></v-select>

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click.prevent="register">
                    Register
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: ["master", "PhD", "postdoc", "prof", "other"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 8) || "Password must be more than 8 characters"
      ],
      select: "",
      tab: null,
      items: [{ tab: "Login" }, { tab: "Register" }]
    };
  },
  computed: {
    modalState: {
      get() {
        return this.$store.getters["login/modalState"];
      },
      set(value) {
        this.$store.commit("login/updateModalState", value);
      }
    }
  },
  methods: {
    async login() {
      const user = await this.$fireAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      if (user) {
        this.$store.dispatch("login/closeModal");
      }
    },

    async register() {
      const user = await this.$fireAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      if (user) {
        this.$store.dispatch("login/setUserPosition", this.select);
        this.$store.dispatch("login/closeModal");
      }
    }
  }
};
</script>

<style scoped></style>
