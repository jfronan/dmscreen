import React from 'react';
import '../../App.css';
import { capitalizeWord, renderIframe } from '../../utils/Utils';

export default class LogWindow extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="fill">
        <div className="springreen contentTitleBox">
          <div className="contentTitleBoxTitle">{capitalizeWord(this.props.actualTreePath.name)}</div>
        </div>
        <div id="loggerInputContainer" className="loggerInputContainer">
            
        </div>
      </div>
    );
  }
}
