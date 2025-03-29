export function timeAgo(timestamp: string | Date): string {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp)

  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const units = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'week', seconds: 604800 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 },
    { name: 'second', seconds: 1 },
  ]

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds)

    if (interval >= 1) {
      if (interval === 1) {
        return `1 ${unit.name} ago`
      }
      return `${interval} ${unit.name}s ago`
    }
  }

  return 'just now'
}
