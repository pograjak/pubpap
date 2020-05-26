<template>
  <v-form ref="form" v-model="valid">
    <p class="subtitle-2">
      Help others understand your ideas by giving an online presentation!
      <br />The presentation will take place as an interactive online call.
      A recording will be freely available on pubpap.
    </p>
    <v-checkbox
      class="subtitle-2 pt-2"
      label="Organize an online presentation"
      :disabled="disabled"
      v-model="organizePresentation"
    ></v-checkbox>
    <v-container class="py-0 px-0">
      <v-row>
        <v-col cols="12" md="6" class="pb-0">
          <p class="caption">
            Set the goal for audience size. The presentation will only be
            organized if the number is reached.
          </p>
          <v-slider
            label="Audience goal"
            :disabled="!organizePresentation"
            class="pa-0 ma-0"
            v-model="audienceGoal"
            :max="100"
            :min="10"
            :step="1"
          >
            <template v-slot:append>
              <v-text-field
                :value="audienceGoal"
                :disabled="!organizePresentation"
                class="pa-0 ma-0 mt-n1"
                single-line
                suffix="people"
                style="width: 85px"
                @change="changeAudienceGoal"
              ></v-text-field>
            </template>
          </v-slider>
        </v-col>
        <v-col cols="12" md="6" class="pb-0">
          <p class="caption">
            Set the ticket price. Mind that the main goal of ticket purchase
            is to prove real interest in the presentation.
          </p>
          <v-slider
            label="Ticket price"
            :disabled="!organizePresentation"
            class="pa-0 ma-0"
            v-model="bid"
            :max="20"
            :min="3"
            :step="0.5"
          >
            <template v-slot:append>
              <v-text-field
                :value="bid"
                :disabled="!organizePresentation"
                class="pa-0 ma-0 mt-n1"
                single-line
                suffix="USD"
                style="width: 75px"
                @change="changeTicketPrice"
              ></v-text-field>
            </template>
          </v-slider>
        </v-col>
      </v-row>
    </v-container>
    <p class="subtitle-2 pb-2">
      Once the audience goal is reached, we will contact you and the guests
      with further details.
    </p>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      organizePresentation: true,
      audienceGoal: 20,
      bid: 5,
    };
  },
  props: {
    disabled: Boolean
  },
  methods: {
    async changeAudienceGoal(val){
      this.audienceGoal = 0;  // force the change propagation
      await this.$nextTick()
      this.audienceGoal = val;
    },
    async changeTicketPrice(val) {
      this.bid = 0;
      await this.$nextTick()
      this.bid = val;
    },
    fetch() {
      if(this.organizePresentation){
        return {
          goal: this.audienceGoal * this.bid,
          bid: this.bid,
          currentValue: 0,
          subsIds: []
        };
      }
      return {};
    },
    push(da){
      if(da.goal && da.bid){
        this.organizePresentation = true;
        this.bid = da.bid;
        this.audienceGoal = da.goal / da.bid;
      }else{
        this.reset();
        this.organizePresentation = false;
      }
    },
    reset() {
      this.bid = 5;
      this.audienceGoal = 20;
      this.organizePresentation = true;
    }
  }
};
</script>