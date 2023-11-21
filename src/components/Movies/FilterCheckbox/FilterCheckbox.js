import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ width, breakpoint, ...props}) {
    // Проверяем состояние фильтра
    const checkboxStatus = (evt) => {
        return props.checkboxStatus(!evt.target.checked);
    };

    return width > breakpoint? (
        <div className="filtercheckbox">
            <div className="filtercheckbox__container">
                <label className="filtercheckbox__checkbox">
                    <input
                        className="filtercheckbox__invisible-checkbox"
                        type="checkbox"
                        onChange={checkboxStatus}
                        checked={!props.checkBoxStat}
                    />
                    
                    <span className="filtercheckbox__visible-checkbox-custom"></span>
                    <p className="filtercheckbox__title">Короткометражки</p>
                </label>
            </div>
        </div>
    )
    :
    (<div className="filtercheckbox">
            <div className="filtercheckbox__container">
                <label className="filtercheckbox__checkbox">
                <p className="filtercheckbox__title">Короткометражки</p>
                    <input
                        className="filtercheckbox__invisible-checkbox"
                        type="checkbox"
                        onChange={checkboxStatus}
                        checked={!props.checkBoxStat}
                    />
                    
                    <span className="filtercheckbox__visible-checkbox-custom"></span>
                    
                </label>
            </div>
        </div>)
}

export default FilterCheckbox;