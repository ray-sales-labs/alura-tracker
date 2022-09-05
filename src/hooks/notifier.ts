import { NotificationType } from "@/interfaces/INotification"
import { store } from '@/store'
import { ADD_NOTIFICATION } from "@/store/mutations_type"

type Notifier = {
  notify: (type: NotificationType, title: string, text: string) => void
}

export default (): Notifier => {
  const notify = (type: NotificationType, title: string, text: string): void => {
    store.commit(ADD_NOTIFICATION, {
      title,
      text,
      type
    })
  }

  return {
    notify
  }
}