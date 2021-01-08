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
      <div id="responsiveVideoWrapper" className="relative w-full h-0 pb-fluid-video">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://player.vimeo.com/video/` + this.props.src}
          ref="iframe"
          allowFullScreen
        />
      </div>
    );
  }
}

export default EmbedVimeo;
