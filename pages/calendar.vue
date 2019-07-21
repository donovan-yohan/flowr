<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-calendar
        id="month-calendar"
        ref="calendar"
        :type="type"
        color="primary"
        :show-month-on-first="false"
        :weekday-format="(vTimestamp) => {
          days = ['S','M','T','W','T','F','S'];
          return days[vTimestamp.weekday];
        }"
      >
    </v-calendar>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data() {
      return {
        type: 'month',
        typeOptions: [
          { text: 'Day', value: 'day' },
          { text: '4 Day', value: '4day' },
          { text: 'Week', value: 'week' },
          { text: 'Month', value: 'month' },
          { text: 'Custom Daily', value: 'custom-daily' },
          { text: 'Custom Weekly', value: 'custom-weekly' }
        ]
      }
    }
  }
</script>
<style lang="scss">
  .v-content {
    background: white;
  }
  #month-calendar {
    .v-calendar-weekly__head-weekday {
      border: none;
    }
    .v-calendar-weekly__day {
      border: none;
      padding: 0;
      display: inline-flex;
      min-width: calc((100vw - 32px) / 7);
      min-height: calc((100vw - 32px) / 7);
      justify-content: center;
      align-items: center;
    }

    .v-calendar-weekly__day-label {
      position: static;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .v-past {
      color: #ECECEC;
    }
  }
</style>
