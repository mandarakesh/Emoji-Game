/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLossCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {clickedEmojiList: [], isGameInProgress: true, topScore: 0}

  getShuffledEmojiList = () => {
    const {emojisList} = this.props

    return emojisList.sort(() => Math.random() - 0.5)
  }

  restartGame = () => {
    this.setState({clickedEmojiList: [], isGameInProgress: true})
  }

  renderScore = id => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state

    const isWonGame = clickedEmojiList.length === emojisList.length

    return (
      <WinOrLossCard
        isWonGame={isWonGame}
        onClickPlayAgain={this.restartGame}
        score={clickedEmojiList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (currentScore > topScore) {
      newTopScore = currentScore
    }

    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojiList} = this.state
    const isEmojiPresent = clickedEmojiList.includes(id)
    const clickedEmojisLength = clickedEmojiList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (emojisList.length - 1 === clickedEmojisLength) {
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(previousState => ({
        clickedEmojiList: [...previousState.clickedEmojiList, id],
      }))
    }
  }

  randomEmojiList = () => {
    const emojiShuffledList = this.getShuffledEmojiList()

    return (
      <ul className="emoji-container">
        {emojiShuffledList.map(eachItem => (
          <EmojiCard
            clickEmoji={this.clickEmoji}
            emojiDetails={eachItem}
            key={eachItem.id}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojiList, isGameInProgress, topScore} = this.state

    const {emojisList} = this.props
    return (
      <div className="bg-container">
        <NavBar
          topScore={topScore}
          isGameInProgress={isGameInProgress}
          currentScore={clickedEmojiList.length}
        />

        <div className="emoji-body">
          {isGameInProgress ? this.randomEmojiList() : this.renderScore()}
        </div>
      </div>
    )
  }
}
export default EmojiGame
