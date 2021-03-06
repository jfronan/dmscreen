import React from 'react';
import ShareableWindow from '../ShareableWindow';
import { capitalizeWord, renderIframe } from '../../utils/Utils';

export default class NotasArea extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    var template = this.props.locDesc;
    return (
      <div className="fill flex relative">
        <div className="springreen contentTitleBox">
          <div className="contentTitleBoxTitle">{capitalizeWord(this.props.actualTreePath.name)}</div>
        </div>
        <div className="listBoxing">
          <ShareableWindow titulo={capitalizeWord(this.props.actualTreePath.name)} color="springreen" renderData={{data: template, type: "iframe" }}/>
        </div>
      </div>
    );
  }
}
