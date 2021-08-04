# Google Frontend Interview Project
* TLDR: *Build a Message List with Infinite Scroll*

## Howdy! 👋  

This is the frontend interview project for Google!
* Used frameworks: Boostrap, ReactJS, momentjs, webpack

## Getting started
There's a few things you need to get started on to get this to work.

### 1. Installing minimum deps
Make sure you have `node` installed, with a version greater than `7.0.0`.
Once you have a good `node` installed, run `npm install` in this repo to get your dependencies. Alternatively, you can use `yarn` instead.

### 2. Serving your app
By default, you can run `npm run start-dev` to run your app, serving the files from `/public`. 
It will start up localhost at 3000 port, or you simply can go to this url: http://localhost:3000/

## Extra notes

## Browsers
1. chrome on Mac
2. safari on Mac
3. Safari on Iphone
4. Chrome on Iphone

## Engineering decisions drove the solution
1. Infinite scroll is implemented using IntersectionObserver Api
   This avoids the need to add window.scroll event and hence events are not triggered on every scroll action. IntersectionObserver allows us to trigger the event when target element intersects with viewport.

3. Wanted to quickly get started on initail design prototype, hence used bootstrap for it's inbuilt grid system.

4. Added generic and basic component (Atoms) which can be used by any other HOC components in teh components folder.

5. Tried to create  HOC  (Cardswipe) that has the swipe animations so that card component is not impacted.

## What user experience questions shaped your prototype
1.  Hamburger icon gives a impression that this is not just a standalone page but can have more pages
    or has potential to be atleast a SPA.

2. On Infinite scroll if the user reaches end of the messages, to avoid making unnecessary service the    
   solution checks for end of message (does a check on pageToken) and stops the infinite scroll incase if it's true

3.  For card swipe had to track every position of the card movement hence had to go with the transform option (can be  
    improved)

## Given more time, what your next would steps be
1. Add more loader sprites, before loading the first set of messages
2. Have a small loader at the bottom of the message list where we can indicate the user of more data being loaded
3. In case we end up loading a lot of messages on the document then going back to top of the page will just become very 
    tedious. There needs to be a better way of handling this. If had more time would definitely clean up older messages from the DOM.
4. If deviating from the design is accepatble, then would like to propose to have a load more button for the user to click 
   on at the bottom of the message list, so that we dont keep infinitely scrollling unnecessarily
5. Add Tests
6. Swiping card to right does not prompt for user confirmation, would a confirmation flow for user to confirm before message 
   is permanently deleted.
7. Would add support for deleting the card on desktop as well
8. Would add custom fonts & iconographs

## Compromises made To stay under 10hr limit
1.For card swipe currently only using touch-action: none CSS property, might need a better solution for page jumpiness
2.Navigation is really basic
3.Didnt get a chance to add routes for navigation
4.Styles inlcude the entire boostrap css file, needs cleanup there



