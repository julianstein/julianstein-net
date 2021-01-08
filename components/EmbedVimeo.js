const Vimeo = require('@vimeo/player');

class EmbedVimeo extends React.Component {
  state = {
    pos: null
  };

  componentDidMount() {
    const player = new Vimeo.default(this.refs.iframe);

    this._pause = () => {
      player.pause().then(() => {
        //console.log('paused!')
        player.getCurrentTime().then((seconds) => {
          this.setState({ pos: seconds });
        });
      });
    };

    this._play = () => {
      player.play().then(() => {
        // console.log(this.state.pos)
        player.setCurrentTime(this.state.pos).then((seconds) => {
          // seconds = the actual time that the player seeked to
        });
      });
    };
  }

  render() {
    //this.props.active === this.props.index ? this._play : this._pause

    return (
      <iframe
        src={`https://player.vimeo.com/video/` + this.props.src}
        ref="iframe"
        allowFullScreen
      />
    );
  }
}

export default EmbedVimeo;
