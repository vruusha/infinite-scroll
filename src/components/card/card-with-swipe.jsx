import React from 'react';
import PropTypes from 'prop-types';

import { Card } from './index';

const noop = () => ({});

/***
 * Card component with Animations and swipe functionality
 */
export class CardSwipe extends React.Component {

    touchStart = 0;
    touchEnd = 0;
    transformAnimation = 'translate3d(0px, 0px, 0px)';
    count = 0;

    constructor(props) {
        super(props);
        this.state = {
            styleTransform: { 
                transform: `${this.transformAnimation}`
            },
            hideCard: false,
            isCardSwiped: false
        };

        this.onHandleTouchStart = this.onHandleTouchStart.bind(this);
        this.onHandleTouchMove = this.onHandleTouchMove.bind(this);
        this.onHandleTouchEnd = this.onHandleTouchEnd.bind(this);
    }

    onHandleTouchStart(e) {
        this.touchStart = e.targetTouches[0].clientX;
    }

    onHandleTouchMove(e) {
        this.touchEnd = e?.targetTouches[0]?.clientX;

        //Card is being swipped right
        if (this.touchStart < this.touchEnd) {
            this.animateCardSwipe(this.touchEnd);
            this.stopPageScrolling();
        }
    }

    /***
     * Handles the swipe event and diismisses the card if swipe is successfull
     */
    onHandleTouchEnd() {
        //When user swipes the card to extreme right, dismiss the card
        if (this.touchStart - this.touchEnd < -150) {
            this.dismissCard();

        } else {
            //otherwise Reset the card position
            this.resetCardAnimation();
        }
        this.resetPageScrolling();
    }

    /**
     * Moves the card based on the swipe poisition of cursor
     * @param {transformPosition}  
     */
    animateCardSwipe(transformPosition) {
        this.setState({
            styleTransform: { transform: `translate3d(${transformPosition}px, 0px, 0px)`},
            isCardSwiped: true
        });
    }

    /**
     * Resets the card position
     */
    resetCardAnimation() {
        this.setState({
            styleTransform: { transform: `${this.transformAnimation}` },
            isCardSwiped: false
        });
    }

    /**
     * Hides the card from the viewport
     */
    dismissCard() {
        this.setState({
            hideCard: true
        });
        // service call or cleanup for the messgae
        //onSwipeRight();
    }

    /**
     * Stopping page scroll when card is swiped to avoid jumpiness
     */
    stopPageScrolling() {
        document.body.classList.add('no-scroll');
    }

    /**
     * Resetting the page scroll class
     */
    resetPageScrolling() {
        document.body.classList.remove('no-scroll');
    }


    render() {
        const { options, showAnimation, onSwipeLeft, onSwipeRight,refCB} = this.props;
        const { id, title, subTitle, imageAlt, imageURL, content} = options;
        let styleClasses = `${this.state.hideCard ? 'hide ' : ''}${this.state.isCardSwiped ? 'swiped ' : ''}`;

        return (
            <Card id={id}
                refCB={refCB}
                title={title}
                subTitle={subTitle}
                content={content}
                imageURL={imageURL}
                imageAlt={imageAlt}
                onTouchStart={!!showAnimation ? this.onHandleTouchStart : noop}
                onTouchMove={!!showAnimation ? this.onHandleTouchMove : noop}
                onTouchEnd={!!showAnimation ? this.onHandleTouchEnd : noop}
                styleClasses={styleClasses}
                inlineStyles={this.state.styleTransform} />

        )
    }
}


CardSwipe.propTypes = {
    refCB:PropTypes.func,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
    showAnimation: PropTypes.bool,
    options: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        title: PropTypes.string,
        subTitle: PropTypes.string,
        imageURL: PropTypes.string,
        imageAlt: PropTypes.string,
        content: PropTypes.string,
    })
};

CardSwipe.defaultProps = {
    showAnimation: false,
}
