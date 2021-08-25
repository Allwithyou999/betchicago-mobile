import { Popup } from '../components/shared/popup'

class Service {
  popup?: Popup

  setRef = (ref: Popup) => {
    this.popup = ref
  }

  show = (text: string) => {
    this.popup.open(text)
  }
}

export const PopupService = new Service()
