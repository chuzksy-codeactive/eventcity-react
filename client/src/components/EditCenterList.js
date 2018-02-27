import React from 'react';

const EditCenterList = props => {
  let centerLists = null;
  if (Array.isArray(props.centers.center)) {
    const centers = props.centers.center;
    centerLists = centers.map((value, i) => {
      return <div key={value.id}>{`${i + 1}. ${value.name}`}</div>;
    });
  }
  return (
    <div className="list-wrapper">
      <div>Centers List</div>
      {centerLists}
    </div>
  );
};

export default EditCenterList;
