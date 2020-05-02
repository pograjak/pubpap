<template>
  <v-card class="question">
    <v-container fluid>
      <v-row dense>
        <v-col cols="1" class="text-center icons">
          <v-icon>mdi-arrow-up-thick</v-icon>24
          <v-icon>mdi-arrow-down-thick</v-icon>
        </v-col>

        <v-col>
          <v-card-title>I see you are a freshman</v-card-title>
          <v-card-text>Human operators are generally not involved in separation, that's controlled by on-board computers according to the plan programmed into them. 2 way radio lets human controllers see what is going on and send commands if necessary.</v-card-text>
          <v-row no-gutters>
            <v-col></v-col>
            <v-col cols="auto">
              <v-row dense>
                <v-col cols="1">
                  <v-icon>mdi-account</v-icon>
                </v-col>
                <v-col>
                  <p class="name">
                    prof. Jiri Matas
                    <br />
                    <small>Prof</small>
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script></script>

<style scoped>
.question {
    background-color: lightyellow;
}
.icons {
  max-width: 35px;
  text-align: center;
}
.name {
  font-size: 10pt;
  max-height: 20px;
  text-align: right;
  padding-right: 10px;
  line-height: 100%;
  margin: 0;
  margin-bottom: 3px;
}
</style>