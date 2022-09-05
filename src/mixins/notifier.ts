import { NotificationType } from "@/interfaces/INotification"
import { ADD_NOTIFICATION } from "@/store/mutations_type"
import { store } from '@/store'

export const notifierMixin = {
  methods: {
    notify(type: NotificationType, title: string, text: string): void {
      store.commit(ADD_NOTIFICATION, {
        title,
        text,
        type
      })
    }
  },
}