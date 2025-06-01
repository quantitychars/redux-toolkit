import React from "react";
import PropTypes from "prop-types";
import AddBtn from "../Button/AddBtn";
import FavBtn from "../Button/FavBtn";
export default function ProductCardActions({ children }) {
  return (
    <div className="p-4 pt-0 flex justify-between items-center">
      <AddBtn className="mr-2" />
      <FavBtn />
    </div>
  );
}

ProductCardActions.propTypes = {
  children: PropTypes.node,
};
