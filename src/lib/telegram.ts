export const sendTelegramMessage = async (message: string) => {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) return console.warn('Missing Telegram credentials')

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    })
  } catch (error) {
    console.error('[TELEGRAM_TEXT_ERROR]', error)
  }
}

export const sendTelegramImage = async ({
  imageUrl,
  caption,
}: {
  imageUrl: string
  caption?: string
}) => {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) return console.warn('Missing Telegram credentials')

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: imageUrl,
        caption,
        parse_mode: 'Markdown',
      }),
    })
  } catch (error) {
    console.error('[TELEGRAM_IMAGE_ERROR]', error)
  }
}
