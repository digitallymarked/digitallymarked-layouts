import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { TimelineMax, Power2 } from 'gsap/all';

import './OmniPill.scss';

class OmniPill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };

    // Reference to content
    this.myContent = null;

  }

  componentWillMount() {
    this.setState({ content: this.props.children });
  }

  componentDidUpdate(prevProps) {
    const newProps = this.props;
    const changeState = () => {
      this.setState({ content: newProps.children });
    };
    const tl = new TimelineMax();
    const myAnimation = () => {
      tl
        .to(this.myContent, 0.2, {
          y: -15,
          opacity: 0,
          ease: Power2.easeIn,
        })
        .call(changeState)
        .set(this.myContent, { y: 15, opacity: 0 })
        .to(this.myContent, 0.2, {
          y: 0,
          opacity: 1,
          ease: Power2.easeOut,
        });
    };

    // Only change if there is a new song
    if (prevProps.first != newProps.first) {
      myAnimation();
    }
  }

  render() {
    const { show } = this.props;
    const tl = new TimelineMax();
    return (
      <Transition
        appear
        in={show}
        mountOnEnter
        unmountOnExit
        addEndListener={(node, done) => {
          tl.set(node, { y: show ? 15 : 0 }).to(node, 0.5, {
            y: show ? 0 : 15,
            autoAlpha: show ? 1 : 0,
            ease: show ? Power2.easeOut : Power4.easeIn,
            onComplete: done,
          });
        }}
      >
        <div className="pillWrapper">
          <div>
            <img className="icon" src={this.props.icon} />
            <div className="content" ref={div => (this.myContent = div)}>
              {this.state.content}
            </div>
          </div>
        </div>
      </Transition>
    );
  }
}

export default OmniPill;
