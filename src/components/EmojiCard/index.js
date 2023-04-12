import './index.css'

const EmojiCard = props => {
  const {emojiDetails, clickEmoji} = props
  const {emojiName, emojiUrl, id} = emojiDetails

  const onClickEmojiCard = () => {
    clickEmoji(id)
  }

  return (
    <li className="emoji-list-container">
      <button onClick={onClickEmojiCard} type="button" className="button">
        <img alt={emojiName} className="emoji-logo" src={emojiUrl} />
      </button>
    </li>
  )
}
export default EmojiCard
