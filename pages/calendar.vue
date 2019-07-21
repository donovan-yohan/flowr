<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-calendar
        id="month-calendar"
        ref="calendar"
        v-model="start"
        :type="type"
        :end="end"
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
    }
    .v-past {
      color: #ECECEC;
    }
  }
</style>
