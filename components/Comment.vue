<template>
  <v-card>
    <v-container>
      <v-row dense>
        <v-col cols="2" class="text-center icons">
          <v-row class="flex-column" justify="center">
            <v-col>
              <v-btn icon>
                <v-icon>mdi-arrow-up-thick</v-icon>
              </v-btn>
            </v-col>

            <v-col>24</v-col>

            <v-col>
              <v-btn icon>
                <v-icon>mdi-arrow-down-thick</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col>
          <v-row rows="2" dense no-gutters>
            <v-col>
              <v-card-text>Human operators are generally not involved in separation, that's controlled by on-board computers according to the plan programmed into them. 2 way radio lets human controllers see what is going on and send commands if necessary.</v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="name">
              Jiri Matas
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script></script>

<style scoped>
.icons {
  max-width: 50px;
}
.name {
  max-height: 20px;
  text-align: right;
}
</style>