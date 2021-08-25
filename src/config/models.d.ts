export type User = {
  deleteDate?: string
  dob: string
  emailUpdates: {
    bcNewsLetter: boolean
    contestUpdates: boolean
    eventUpdates: boolean
    morningScoreBoard: boolean
  }
  favouritePlayers?: {
    [key: string]: {
      date: Date
      name: string
      notifications?: {
        apStories: boolean
        bcStories: boolean
        gameUpdates: boolean
        injuryUpdates: boolean
        oddsChange: boolean
        oddsPost: boolean
      }
    }
  }
  favouriteTeams?: {
    [key: string]: {
      date: Date
      name: string
      notifications?: {
        apStories: boolean
        bcStories: boolean
        gameUpdates: boolean
        injuryUpdates: boolean
        oddsChange: boolean
        oddsPost: boolean
      }
    }
  }
  firstName: string
  lastName: string
  isActive: boolean
  notifications: {
    apStories: boolean
    bcStories: boolean
    breakingNews: boolean
    contestUpdates: boolean
    gameUpdates: boolean
    injuryUpdates: boolean
    oddsChange: boolean
    oddsPost: boolean
    pushNotifications: boolean
  }
  profileImage?: string
  savedArticles?: {
    [key: string]: {
      date: string
      isDeleted: boolean
    }
  }
  signupDate: string
  userAgent?: string
}

export type UpdateProfileParams = Partial<User> & { email?: string; password?: string }
