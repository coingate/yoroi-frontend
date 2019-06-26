// @flow
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages, FormattedHTMLMessage } from 'react-intl';
import SvgInline from 'react-svg-inline';
import globalMessages from '../../../i18n/global-messages';
import { handleExternalLinkClick } from '../../../utils/routing';
import styles from './ServerErrorBanner.scss';
import warningSvg from '../../../assets/images/warning.inline.svg';
import type { ServerStatusErrorType } from '../../../types/serverStatusErrorType';

const messages = defineMessages({
  serverErrorLabel: {
    id: 'serverError.label.message',
    defaultMessage: '!!!WARNING: Connection to the server failed. Please check our Twitter account {twitterLink}. Your funds are safe (SAFU), you can check them in any block explorer.',
  },
  networkErrorLabel: {
    id: 'networkError.label.message',
    defaultMessage: '!!!WARNING: Connection to the server failed. Please check your internet connection or our Twitter account {twitterLink}. Your funds are safe (SAFU), you can check them in any block explorer.',
  },
});

type Props = {
  errorType: ?ServerStatusErrorType,
};


@observer
export default class ServerErrorBanner extends Component<Props> {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const {
      errorType
    } = this.props;

    const twitterLink = (
      <a
        href={intl.formatMessage(globalMessages.twitterLinkUrl)}
        onClick={event => handleExternalLinkClick(event)}
      >
        {intl.formatMessage(globalMessages.twitterLinkUrl)}
      </a>
    );

    const displayMessage = (() => {
      switch (errorType) {
        case 'server':
          return messages.serverErrorLabel;
        case 'network':
          return messages.networkErrorLabel;
        default:
          return null;
      }
    })();

    return (
      <div>
        {displayMessage === null ? null : (
          <div className={styles.serverError}>
            <SvgInline key="0" svg={warningSvg} className={styles.warningIcon} />
            <FormattedHTMLMessage {...displayMessage} values={{ twitterLink }} key="1" />
          </div>)
        }
      </div>
    );
  }
}
