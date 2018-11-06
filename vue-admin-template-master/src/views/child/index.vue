<template>
  <!-- 命令行生成的模板 -->
  <div class="dashboard-container">
    <div>child
      <button @click="refreshEvents">Refresh</button>
        <button v-if="selected._id" @click="removeEvent">Remove</button>
        <pre>{{ selected }}</pre>
      <full-calendar ref="calendar" :event-sources="eventSources" @event-selected="eventSelected" @event-created="eventCreated" :config="config"></full-calendar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'child',
  data() {
    return {
      events: [
        {
          id: 1,
          title: 'event2',
          start: '2018-06-21 08:30',
          end: '2018-06-21 09:00',
          allDay: false
        }
      ],
      config: {
        allDaySlot: false,
        slotDuration: '00:15:00',
        locale: 'zh-cn',
        aspectRatio: 1.5,
        height: 800,
        editable: false,
        header: { right: 'month,agendaWeek' },
        views: {
          agendaWeek: {
            eventLimit: 0
          }
        }
      },
      selected: {}
    }
  },
  methods: {
    refreshEvents() {
      this.$refs.calendar.$emit('refetch-events')
    },
    removeEvent() {
      this.$refs.calendar.$emit('remove-event', this.selected)
      this.selected = {}
    },
    eventSelected(event) {
      console.log(event)
    },
    eventCreated(...test) {
      console.log(...test)
      // this.events = this.events.push({
      //   id: this.events++,
      //   title: 'event' + this.events++,
      //   start: '2018-06-14 08:30',
      //   end: '2018-06-14 09:00'
      // })
    },
    eventClicks(event) {
      console.log(event)
    }
  },
  computed: {
    eventSources() {
      const self = this
      return [
        {
          events(start, end, timezone, callback) {
            setTimeout(() => {
              callback(self.events.filter(() => Math.random() > 0.5))
            }, 1000)
          }
        }
      ]
    }
  }
}
</script>
<style lang="sass">
</style>
