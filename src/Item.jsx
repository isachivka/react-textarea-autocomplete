// @flow

import React from "react";

import type { ItemProps } from "./types";

export default class Item extends React.Component<ItemProps, *> {
  clicked: boolean;

  static defaultProps = {
    renderer: null,
  };

  shouldComponentUpdate(nextProps: ItemProps) {
    if (
      this.props.item !== nextProps.item ||
      this.props.selected !== nextProps.selected ||
      this.props.style !== nextProps.style ||
      this.props.className !== nextProps.className
    ) {
      return true;
    }

    return false;
  }

  selectItem = () => {
    const { item, onSelectHandler } = this.props;
    onSelectHandler(item);
  };

  onTouchStart = () => {
    this.clicked = true;
    this.selectItem();
  };

  onTouchEnd = (e) => {
    e.preventDefault();
    if (this.clicked) {
      this.props.onClickHandler(e);
    }
  };

  clearClicked = () => {
    this.clicked = false;
  };

  render() {
    const {
      component: Component,
      style,
      onClickHandler,
      item,
      selected,
      className,
      innerRef,
    } = this.props;

    const listeners = {
      onClick: onClickHandler,
      onFocus: this.selectItem,
      onMouseEnter: this.selectItem,
      onTouchStart: this.onTouchStart,
      onTouchEnd: this.onTouchEnd,
      onTouchMove: this.clearClicked,
      onTouchCancel: this.clearClicked,
    };

    if (this.props.renderer) {
      return this.props.renderer({
        listeners,
        className,
        style,
        selected,
        item,
        ref: innerRef,
      });
    }

    return (
      <li className={`rta__item ${className || ""}`} style={style}>
        <div
          {...listeners}
          className={`rta__entity ${
            selected === true ? "rta__entity--selected" : ""
          }`}
          role="button"
          tabIndex={0}
          /* $FlowFixMe */
          ref={innerRef}
        >
          <Component selected={selected} entity={item} />
        </div>
      </li>
    );
  }
}
