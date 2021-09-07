import React from "react";
import "./Header.scss";
import { IconDodo } from "../Icon/Icon";

export const Header = () => {
  return (
    <>
      <header className="todo__header">
        <div className="todo__header__content">
          <div className="todo__header__logo">
            <h1 className="heading heading__h1">Do Do App</h1>
            <IconDodo />
          </div>

          <h2 className="heading heading__h2">
            Create, track and extinguish your daily tasks!
          </h2>
        </div>
      </header>
    </>
  );
};
