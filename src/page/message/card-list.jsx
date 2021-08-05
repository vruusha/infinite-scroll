import React from 'react';

import {CardSwipe} from '../../components/card/card-with-swipe';
import {lastSeenStatus} from './helper.js';
import {DOMAIN_URL, IMAGE_ALT} from '../../enums';

/**
 * HOC for List of cards
 * @param {Card} props 
 * @returns List<CardSwipe> 
 */

function CardList(props) {
    const { cards, refCB} = props;

    if (!cards || cards.length === 0) {
        return <div>No Messages Found</div>;
    }

    const listItems = cards.map((card, index) => {
        const options = {
            id: card.id,
            title: card.author.name,
            subTitle: lastSeenStatus(card.updated),
            content: card.content,
            imageURL:`${DOMAIN_URL}${card.author.photoUrl}`,
            imageAlt: IMAGE_ALT
        }

        if (cards.length === index + 1) {
            return (<CardSwipe key={card.id} options={options} showAnimation={true} refCB={refCB}/>)
        } else {
            return (<CardSwipe key={card.id} options={options} showAnimation={true}/>)
        }
        
    });

    return (
        <div className="card-list" role="listbox">
            {listItems}
        </div>
    );
}

export {CardList};