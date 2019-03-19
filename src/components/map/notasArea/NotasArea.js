import React from 'react';
import ShareableWindow from '../../ShareableWindow';
import '../../../App.css';
import { capitalizeWord } from '../../../utils/Utils';

export default class NotasArea extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    var template = this.props.locDesc;
    return (
      <ShareableWindow titulo={capitalizeWord(this.props.actualTreePath.name)}>
        <div className="springreen contentTitleBox">
          <div className="contentTitleBoxTitle">{capitalizeWord(this.props.actualTreePath.name)}</div>
        </div>
        <iframe className="fill" src={template} seamless/>
      </ShareableWindow>
    );
  }
}
