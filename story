check to see if the browser has geolocation service
no? I can't work with this browser. Put a gray box where the map would be.
yes? then move on.

Ask the browser for current location and provide a time limit
no? let the user know that the app can't continue
yes? move on.

Now that I have the current position. Draw the map and center it on that position. I can place a marker on that position with the string "you are here". (side note: could I use canvas to draw a radius around the marker to indiciate the accuracy of the location?)

There will be a form on the page that goes from inaccessible to accessible should the location service provide a current position.

The form has a box that would allow the user to search for their destination. The form has another box that would indicate how far from the destination the user should be alerted.

To set the destination point, the user simply clicks on the exact spot. A marker is placed on that spot with the title "destination". A cirle certained at the destination marker then indicates the range set by the user. (side note: should the user change the range, the circle will change in size accordingly) The map then zoom out just enough to show both the current position and the destination.

When the user is within the user-determined distance from the destination, a yellow box pops up with a triangle danger sign letting the user know they're near their destination. The yellow box can say something like this "You're within #{distance} of your destination". Once the user is within range, the current position is copied to the previous position. Then we take the differen to find out if the user is heading towards the destination or away from destination. When the user is more than 20% past their alert point, the yellow box turns to an orange box. When the user is more than 50% past their alert point, the orange box turns into a red box. 

When the user has passed the destination by more than 30%, the warning sign changes to a sad face, and a text in the red box says the following: "Sorry! We missed our stop. Hit the reset button to select another stop."

Hitting the reset button centers the map to their current position. It clears all the text field. It removes the box. It resets all the variables. Basically, we go back to what the webpage was when the user first loaded the page.
