import React, { Component } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import "react-h5-audio-player/lib/styles.css";

const playlist = [
  { name: '枝芽', src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/zhiya.mp3' },
  { name: '自由女神', src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/ziyounvshen.mp3' },
  { name: '无雨无晴', src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3' },
  { name: '碎片', src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/suipian.mp3' },
  { name: '永恒的港湾', src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/yonghengdegangwan.mp3' },
]



class PlayList extends Component {
  state = {
    currentMusicIndex: 0,
  }

  handleClickPrevious = () => {
    this.setState((prevState) => ({
      currentMusicIndex: prevState.currentMusicIndex === 0 ? playlist.length - 1 : prevState.currentMusicIndex - 1,
    }))
  }

  handleClickNext = ()=> {
    this.setState((prevState) => ({
      currentMusicIndex: prevState.currentMusicIndex < playlist.length - 1 ? prevState.currentMusicIndex + 1 : 0,
    }))
  }

  render(){
    const { currentMusicIndex } = this.state
    return (
      <div>
        <p>currentMusicIndex: {currentMusicIndex}</p>
        <AudioPlayer
          onEnded={this.handleClickNext}
          autoPlayAfterSrcChange={true}
          showSkipControls={true}
          showJumpControls={false}
          src={playlist[currentMusicIndex].src}
          onClickPrevious={this.handleClickPrevious}
          onClickNext={this.handleClickNext}
        />
      </div>
    )
  }
}

export default PlayList