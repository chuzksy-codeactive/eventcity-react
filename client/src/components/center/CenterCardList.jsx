import React, { Component } from 'react';
import CenterCards from './CenterCards.jsx';

class CenterCardList extends Component {
  render() {
<<<<<<< HEAD:client/src/components/center/CenterCardList.jsx
    const { centers } = this.props;
    let centerCards = null;
    if (Array.isArray(centers) && centers.length > 0) {
      const { centers } = this.props;
      centerCards = centers.map(center => <CenterCards key={center.id} center={center} />);
    } else if (Array.isArray(centers) && centers.length === 0) {
      centerCards = <div className="no-centers-found">No centers available yet</div>;
=======
    let centerCards = null;
    if (Array.isArray(this.props.centers) && this.props.centers.length > 0) {
      const { centers } = this.props;
      centerCards = centers.map(center => <CenterCards key={center.id} center={center} />);
    } else if (Array.isArray(this.props.centers) && this.props.centers.length < 0) {
      centerCards = <div>No centers available yet</div>;
>>>>>>> d3879673edfaa40b071791cd1d59444e2fa9a85a:client/src/components/center/CenterCardList.jsx
    }
    return (
      <div className="container">
        <div className="row cards">{centerCards}</div>
      </div>
    );
  }
}
export default CenterCardList;
