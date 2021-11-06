// @flow
import { Component } from 'react';
import type { Node, ComponentType } from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { intlShape } from 'react-intl';
import globalMessages from '../../../i18n/global-messages';
import BannerContainer from '../../banners/BannerContainer';
import type { GeneratedData as BannerContainerData } from '../../banners/BannerContainer';
import type { InjectedOrGenerated } from '../../../types/injectedPropsType';
import type { GeneratedData as SidebarContainerData } from '../../SidebarContainer';
import type { GeneratedData as NavBarContainerRevampData } from '../../NavBarContainerRevamp';
import type { TokenInfoMap } from '../../../stores/toplevel/TokenInfoStore';
import type { TokenRow } from '../../../api/ada/lib/storage/database/primitives/tables';

import TopBarLayout from '../../../components/layout/TopBarLayout';
import SidebarContainer from '../../SidebarContainer';
import NavBarTitle from '../../../components/topbar/NavBarTitle';
import type { $npm$ReactIntl$IntlFormat } from 'react-intl';
import { PublicDeriver } from '../../../api/ada/lib/storage/models/PublicDeriver/index';
import { withLayout } from '../../../styles/context/layout';
import type { LayoutComponentMap } from '../../../styles/context/layout';
import NavBarContainerRevamp from '../../NavBarContainerRevamp';
import WalletEmptyBanner from '../WalletEmptyBanner';
import BuySellDialog from '../../../components/buySell/BuySellDialog';
import WalletDelegationBanner from '../WalletDelegationBanner';
import CardanoStakingPage from './CardanoStakingPage';
import type { ConfigType } from '../../../../config/config-types';
import { truncateToken } from '../../../utils/formatters';
import { getTokenName } from '../../../stores/stateless/tokenHelpers';
import { Box } from '@mui/system';

export type GeneratedData = typeof StakingPage.prototype.generated;

// populated by ConfigWebpackPlugin
declare var CONFIG: ConfigType;
type Props = {|
  ...InjectedOrGenerated<GeneratedData>,
  actions: any,
  stores: any,
|};
type InjectedProps = {|
  +renderLayoutComponent: LayoutComponentMap => Node,
|};

type AllProps = {| ...Props, ...InjectedProps |};
@observer
class StakingPage extends Component<AllProps> {
  static contextTypes: {| intl: $npm$ReactIntl$IntlFormat |} = {
    intl: intlShape.isRequired,
  };

  render(): Node {
    const sidebarContainer = <SidebarContainer {...this.generated.SidebarContainerProps} />;
    const { hasAny, recentTransactionsRequest } = this.generated.stores.transactions;
    const publicDeriver = this.generated.stores.wallets.selected;
    if (publicDeriver == null) {
      throw new Error(`${nameof(StakingPage)} no public deriver. Should never happen`);
    }
    const isWalletWithFunds = !recentTransactionsRequest.wasExecuted || hasAny
    return (
      <TopBarLayout
        banner={<BannerContainer {...this.generated.BannerContainerProps} />}
        sidebar={sidebarContainer}
        navbar={
          <NavBarContainerRevamp
            {...this.generated.NavBarContainerRevampProps}
            title={
              <NavBarTitle
                title={this.context.intl.formatMessage(globalMessages.stakingDashboard)}
              />
            }
          />
        }
        showInContainer
        showAsCard
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            '& > div:last-child': {
              flex: '1 1 auto',
            },
            '&>div': {
              flex: '0 1 auto',
            },
          }}
        >
          {isWalletWithFunds ? null : (
            <WalletEmptyBanner
              isOpen={this.generated.stores.transactions.showWalletEmptyBanner}
              onClose={this.generated.actions.transactions.closeWalletEmptyBanner.trigger}
              onBuySellClick={() =>
                this.generated.actions.dialogs.open.trigger({ dialog: BuySellDialog })
              }
            />
          )}
          <WalletDelegationBanner
            isOpen={this.generated.stores.transactions.showDelegationBanner}
            onClose={this.generated.actions.transactions.closeDelegationBanner.trigger}
            onDelegateClick={() => console.log('delegating')}
            isWalletWithFunds={isWalletWithFunds}
            ticker={truncateToken(
              getTokenName(
                this.generated.stores.tokenInfoStore.getDefaultTokenInfo(
                  publicDeriver.getParent().getNetworkInfo().NetworkId
                )
              )
            )}
          />
          <Box sx={{ '& > div': { height: '100%' }, iframe: { height: '100%' } }}>
            <CardanoStakingPage
              stores={this.props.stores}
              actions={this.props.actions}
              urlTemplate={CONFIG.seiza.simpleTemplate}
            />
          </Box>
        </Box>
      </TopBarLayout>
    );
  }

  @computed get generated(): {|
    BannerContainerProps: InjectedOrGenerated<BannerContainerData>,
    NavBarContainerRevampProps: InjectedOrGenerated<NavBarContainerRevampData>,
    SidebarContainerProps: InjectedOrGenerated<SidebarContainerData>,
    actions: {|
      dialogs: {|
        open: {|
          trigger: (params: {|
            dialog: any,
            params?: any,
          |}) => void,
        |},
      |},
      transactions: {|
        closeWalletEmptyBanner: {|
          trigger: (params: void) => void,
        |},
        closeDelegationBanner: {|
          trigger: (params: void) => void,
        |},
      |},
    |},
    stores: {|
      wallets: {| selected: null | PublicDeriver<> |},
      tokenInfoStore: {|
        tokenInfo: TokenInfoMap,
        getDefaultTokenInfo: number => $ReadOnly<TokenRow>,
      |},
      transactions: {|
        showWalletEmptyBanner: boolean,
        showDelegationBanner: boolean,
        hasAny: boolean,
        recentTransactionsRequest: {|
          isExecuting: boolean,
          wasExecuted: boolean,
        |},
      |},
    |},
  |} {
    if (this.props.generated !== undefined) {
      return this.props.generated;
    }
    if (this.props.stores == null || this.props.actions == null) {
      throw new Error(`${nameof(StakingPage)} no way to generated props`);
    }
    const { stores, actions } = this.props;
    return Object.freeze({
      stores: {
        wallets: {
          selected: stores.wallets.selected,
        },
        tokenInfoStore: {
          tokenInfo: stores.tokenInfoStore.tokenInfo,
          getDefaultTokenInfo: stores.tokenInfoStore.getDefaultTokenInfo,
        },
        transactions: {
          showWalletEmptyBanner: stores.transactions.showWalletEmptyBanner,
          showDelegationBanner: stores.transactions.showDelegationBanner,
          hasAny: stores.transactions.hasAny,
          recentTransactionsRequest: {
            isExecuting: stores.transactions.recentTransactionsRequest.isExecuting,
            wasExecuted: stores.transactions.recentTransactionsRequest.wasExecuted,
          },
        },
      },
      actions: {
        transactions: {
          closeWalletEmptyBanner: {
            trigger: actions.transactions.closeWalletEmptyBanner.trigger,
          },
          closeDelegationBanner: {
            trigger: actions.transactions.closeDelegationBanner.trigger,
          },
        },
        dialogs: {
          open: {
            trigger: actions.dialogs.open.trigger,
          },
        },
      },
      SidebarContainerProps: ({ actions, stores }: InjectedOrGenerated<SidebarContainerData>),
      NavBarContainerRevampProps: ({
        actions,
        stores,
      }: InjectedOrGenerated<NavBarContainerRevampData>),
      BannerContainerProps: ({ actions, stores }: InjectedOrGenerated<BannerContainerData>),
    });
  }
}
export default (withLayout(StakingPage): ComponentType<Props>);
