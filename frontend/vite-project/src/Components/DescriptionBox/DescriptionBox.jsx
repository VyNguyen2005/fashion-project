import React from "react"
import './DescriptionBox.css';

const DescriptionBox = (props) => {
    return (
        <>
            <div className="descriptionbox">
                <div className="descriptionbox-navigator">
                    <div className="descriptionbox-nav-box">Description</div>
                    <div className="descriptionbox-nav-box fade">Reviews (122)</div>
                </div>
                <div className="descriptionbox-description">
                    <p>This was a closet staple for me until they changed the design to that weird batwing shape so that sleeves
                        are stuck to the rest of the short at the armpit. The blouse would always untuck a little when I raised my
                        arms which that's fine that's normal. But with this batwing shape sleeve,my entire shirt just comes out of
                        my pants and it's really becoming a hassle. Bring back the old design!
                    </p>
                    <p>UNIQLO and Marimekko are pleased to announce the new limited-edition collection just in time for joyful summer sun.
                        The new collection offers a wide array of breezy,comfortable cotton and linen dresses and skirts, along with hats,
                        shoes, and bags to mix and match.
                    </p>
                </div>
            </div>
        </>
    );
}

export default DescriptionBox