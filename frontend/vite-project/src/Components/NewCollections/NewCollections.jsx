import React, { useEffect, useState } from "react";
import './NewCollections.css';
import Item from "../Item/Item";

const NewCollections = () => {
    const [newcollections, setNewCollections] = useState([]);
    useEffect(() => {
      fetch("http://localhost:7000/allcollectionsdata")
          .then((res) => res.json())
          .then((data) => setNewCollections(data))
    }, []);
    return (
        <>
            <div className="new-collections">
                <h1>NEW COLLECTIONS</h1>
                <hr />
                <div className="collections">
                    {newcollections.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_prices={item.new_prices} old_prices={item.old_prices} />
                    })}
                </div>
            </div>
        </>
    );
}

export default NewCollections