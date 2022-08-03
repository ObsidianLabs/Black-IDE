import '../../scss/welcomepage.scss';

import React, { PureComponent } from 'react';

import Auth from '@obsidians/auth';
// import BLACK_IDE_ICON from '../icon.png';
import COIN_PIC from '../coin.webp';
import DISCORD_ICON from '../discord.png';
import ERC20_PIC from '../erc20.webp';
import ERC721_PIC from '../erc721.webp';
import GITHUB_ICON from '../github.png';
import { actions } from '@obsidians/workspace';
import { connect } from '@obsidians/redux';
import platform from '@obsidians/platform';

class WelcomePageWithProps extends PureComponent {
  openLink(link) {
    if (platform.isWeb) return window.open(link);
    const { shell } = window.require('electron');
    shell.openExternal(link);
  }

  createProject() {
    if (!Auth.isLogin) return this.login();
    actions.newProject(platform.isWeb);
  }

  listProject() {
    if (!Auth.isLogin) return this.login();
    this.route(`/${Auth.username}`);
  }

  login() {
    const provider = 'github';
    Auth.login(this.props.history, provider);
  }

  route(path) {
    this.props.history.push(path);
  }

  render() {
    // const { username, project } = match?.params;
    return (
      <div className="welcome-page h-100">
        <div className="title">
          {/* <img src={BLACK_IDE_ICON} /> */}
          <div className="title-image"></div>
          <div className="title-text">
            <div className="title-h1">Welcome to Black IDE</div>
            <div className="desc">
              Black IDE is an integrated development environment, making
              developing Ethereum smart contracts faster and easier.
            </div>
          </div>
          <div className="title-icons">
            <div
              className="title-icon icon-github"
              onClick={() =>
                this.openLink('https://github.com/ObsidianLabs/Black-IDE')
              }
            ></div>
            <div
              className="title-icon icon-discord"
              onClick={() => this.openLink('https://discord.gg/blackide')}
            ></div>
            {!Auth.isLogin && (
              <div className="login-button" onClick={() => this.login()}>
                Login
              </div>
            )}
          </div>
        </div>
        <div className="section">
          <div className="subtitle">Create A New Project</div>
          <div className="desc">
            Create an empty project, or create a project using Coin, ERC20,
            ERC721 templates.
          </div>
          <div className="options">
            <div className="option" onClick={() => this.createProject()}>
              <div className="icon icon-create"></div>
              <div className="option-title">Create Project</div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="subtitle">Start With An Official Project</div>
          <div className="desc">
            Forking from an official project will duplicate a copy to your
            projects, and allows you to explorer freely with an easy start.
          </div>
          <div className="options">
            <div
              className="option"
              onClick={() => this.route('/BlackIDE-ObsidianLab/ERC-721')}
            >
              <div className="icon icon-sample"></div>
              <div className="option-title">Sample ERC-721</div>
            </div>
            <div
              className="option"
              onClick={() => this.route('/BlackIDE-ObsidianLab/ERC-20')}
            >
              <div className="icon icon-sample"></div>
              <div className="option-title">Sample ERC-20</div>
            </div>
            <div
              className="option"
              onClick={() => this.route('/BlackIDE-ObsidianLab/COIN')}
            >
              <div className="icon icon-sample"></div>
              <div className="option-title">Sample Coin</div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="subtitle">What Can Black IDE Do?</div>
          <div className="desc">
            These main features upgrade your smart contract building experience.
          </div>
          <div className="options">
            <div className="option" onClick={() => this.listProject()}>
              <div className="icon icon-project"></div>
              <div className="option-title">Project</div>
              <div className="option-desc">
                Create, edit, build & deploy smart contract
              </div>
            </div>
            <div
              className="option"
              onClick={() => this.route('/network/homestead')}
            >
              <div className="icon icon-network"></div>
              <div className="option-title">Network</div>
              <div className="option-desc">
                Deploy smart contract on popular networks
              </div>
            </div>
            <div className="option" onClick={() => this.route('/contract')}>
              <div className="icon icon-contract"></div>
              <div className="option-title">Contract</div>
              <div className="option-desc">
                Commission contract using contract inspector
              </div>
            </div>
            <div className="option" onClick={() => this.route('/account')}>
              <div className="icon icon-explorer"></div>
              <div className="option-title">Explorer</div>
              <div className="option-desc">
                Check transactions in build-in explorer
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="subtitle">Learn More About Black IDE</div>
          <div className="desc"></div>
          <div className="options">
            <div
              className="option"
              onClick={() =>
                this.openLink(
                  'https://github.com/ObsidianLabs/Black-IDE#readme'
                )
              }
            >
              <div className="icon icon-document"></div>
              <div className="option-title">Document</div>
              <div className="option-desc">
                An English/Chinese tutorial where you can learn all features of
                Black IDE
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(['uiState', 'projects'])(WelcomePageWithProps);
