import React from 'react';
import PropTypes from 'prop-types';

import { Card } from './index';

const noop = () => ({});

/***
 * Card component with Animations and swipe functionality
 */
export class CardSwipe extends React.Component {

    touchStartX = 0;
    touchStartY = 0;
    touchEndX = 0;
    touchEndY = 0;
    transformAnimation = 'translate3d(0px, 0px, 0px)';

    constructor(props) {
        super(props);
        this.state = {
            styleTransform: {
                transform: `${this.transformAnimation}`
            },
            hideCard: false,
            isCardSwiped: false,
            hasOnMouseDownEventTriggered: false
        };

        this.onHandleTouchStart = this.onHandleTouchStart.bind(this);
        this.onHandleTouchMove = this.onHandleTouchMove.bind(this);
        this.onHandleTouchEnd = this.onHandleTouchEnd.bind(this);
    }

    /**
     * Function to track the intiation of swipe/move action on the card
     * @param {event} eve 
     */
    onHandleTouchStart(eve) {
        //Attaching the mouseup event on document only when user starts swiping
        document.onmouseup = this.onHandleTouchEnd;

        this.setState({
            hasOnMouseDownEventTriggered: true,
        });
        let e = this.getTargetTouchEevnt(eve);

        this.touchStartX = e.clientX;
        this.touchStartY = e.clientY;
    }

    /**
     * 
     * Function to detect the movement of touch or mouse and get the mouse and touch position
     * and animates the card accoridngly
     * @param {event} eve 
     * @param {boolean} isDesktop 
     * @returns 
     */
    onHandleTouchMove(eve, isDesktop = false) {
        if (eve?.targetTouches?.length > 1) {
            console.log('Currently dont support multiple touches');
            return;
        }

        if (isDesktop && !this.state.hasOnMouseDownEventTriggered) {
            return;
        }

        let e = this.getTargetTouchEevnt(eve);

        this.touchEndX = e.clientX;
        this.touchEndY = e.clientY;

        //Check if card is swipped right
        if (this.touchStartX !== 0 && this.isCardSwipedRight()) {
            this.animateCardSwipe(this.touchEndX);
            this.stopPageScrolling();
        }
    }

    /***
     * Handles the touch/mouse swipe event end and dismisses the card if swipe is successfull
     */
    onHandleTouchEnd() {
        //When user swipes the card to extreme right, dismiss the card
        if (this.touchStartX - this.touchEndX < -250) {
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
            styleTransform: { transform: `translate3d(${transformPosition}px, 0px, 0px)` },
            isCardSwiped: true
        });
    }

    /**
     * Resets the card position
     */
    resetCardAnimation() {
        this.setState({
            styleTransform: { transform: `${this.transformAnimation}` },
            isCardSwiped: false,
            hasOnMouseDownEventTriggered: false
        });
        document.removeEventListener("mouseup", this.onHandleTouchEnd);
    }

    /**
     * Hides the card from the viewport
     */
    dismissCard() {
        this.setState({
            hideCard: true
        });
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

    /**
     * Checking touch position to determine swipe direction
     * @returns boolean
     */
    isCardSwipedRight() {
        var x = this.touchEndX - this.touchStartX;
        var xr = Math.abs(x);
        var y = this.touchEndY - this.touchStartY;
        var yr = Math.abs(y);

        if (Math.max(xr, yr) > 20 && xr > yr && x >= 0) {

            return true;

        }

        return false;
    }

    getTargetTouchEevnt(e) {
        return e?.targetTouches && e.targetTouches.length === 1 ? e.targetTouches[0] : e
    }

    render() {
        const { options, showAnimation, refCB } = this.props;
        const { id, title, subTitle, imageAlt, imageURL, content } = options;
        let styleClasses = `${this.state.hideCard ? 'hide ' : ''}${this.state.isCardSwiped ? 'swiped ' : ''}`;

        return (
            <Card id={id}
                role="presentation"
                refCB={refCB}
                title={title}
                subTitle={subTitle}
                content={content}
                imageURL={imageURL}
                imageAlt={imageAlt}
                onTouchStart={!!showAnimation ? this.onHandleTouchStart : noop}
                onTouchMove={!!showAnimation ? this.onHandleTouchMove : noop}
                onTouchEnd={!!showAnimation ? this.onHandleTouchEnd : noop}
                onMouseDown={!!showAnimation ? this.onHandleTouchStart : noop}
                onMouseMove={!!showAnimation ? (e)=> {this.onHandleTouchMove(e, true)} : noop}
                styleClasses={styleClasses}
                inlineStyles={this.state.styleTransform} />

        )
    }
}


CardSwipe.propTypes = {
    refCB: PropTypes.func,
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
