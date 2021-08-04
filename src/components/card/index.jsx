import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/***
 * Card component
 */
export function Card(props) {
    const {
        refCB, id, title, subTitle,
        imageAlt, imageURL, content,
        onTouchStart, onTouchMove, onTouchEnd,
        styleClasses, inlineStyles
    } = props;

    return (<div key={id}
                    id={id}
                    className={`card truncate-overflow ${styleClasses}`}
                    onTouchStart={touchStartEvent => onTouchStart(touchStartEvent)}
                    onTouchMove={touchMoveEvent => onTouchMove(touchMoveEvent)}
                    onTouchEnd={() => onTouchEnd()}
                    onMouseDown={touchStartEvent => onTouchStart(touchStartEvent)}
                    onMouseMove={touchMoveEvent => onTouchMove(touchMoveEvent, true)}
                    style={inlineStyles}
                    {...(refCB && { ref: refCB })}
            >

        <div className="header">
            <img className="image" src={imageURL} alt={imageAlt} />
            <div>
                <div className="title">
                    {title}
                </div>
                <div className="sub-title">
                    {subTitle}
                </div>
            </div>
        </div>
        <div className="content text-elipsis">
            {content}
        </div>
    </div>)
}


Card.propTypes = {
    refCB: PropTypes.func,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    title: PropTypes.string,
    subTitle: PropTypes.string,
    imageURL: PropTypes.string,
    imageAlt: PropTypes.string,
    content: PropTypes.string,
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
    styleClasses: PropTypes.string,
    inlineStyles: PropTypes.object,
};

