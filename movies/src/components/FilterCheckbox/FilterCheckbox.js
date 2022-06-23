import React from "react";

function FilterCheckbox(props) {
  return (
    <div className="filtercheckbox">
      <label className="filtercheckbox__label">
        <input
          className="filtercheckbox__input"
          type="checkbox"
          onChange={props.checkShort}
          checked={props.onChecked}
        />
        <span className="filtercheckbox__slider filtercheckbox__round"></span>
      </label>
      <p className="filtercheckbox__paragraph">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
