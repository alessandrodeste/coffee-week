import React from 'react';
import Button from '../Button/Button';
import './Toolbox.css';

const onPrint = () => {
  window.print();
};

const renderSelectBox = (filters, onChangeFilter) => {
  if (!filters || filters.length < 1) {
    return null;
  }
  return (
    <select className="select-box" onChange={onChangeFilter}>
      <option value="">Show All</option>
      {filters.map(filter => (
        <option value={filter} key={filter}>
          {filter}
        </option>
      ))}
    </select>
  );
};

const renderCheckbox = (enabledOnly, onChangeEnabledOnly) => {
  return (
    <label className="checkbox-label">
      <input
        type="checkbox"
        onChange={onChangeEnabledOnly}
        defaultChecked={enabledOnly}
      />
      Enabled Only
    </label>
  );
};

const Toolbox = ({
  filters,
  onChangeFilter,
  enabledOnly,
  onChangeEnabledOnly,
}) => (
  <div className="toolbox">
    <Button value="Print" onClick={onPrint} />
    {renderSelectBox(filters, onChangeFilter)}
    {renderCheckbox(enabledOnly, onChangeEnabledOnly)}
  </div>
);

export default Toolbox;
