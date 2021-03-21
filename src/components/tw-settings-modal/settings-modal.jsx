import {defineMessages, FormattedMessage, intlShape, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import FancyCheckbox from '../tw-fancy-checkbox/checkbox.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import styles from './settings-modal.css';

/* eslint-disable react/no-multi-comp */

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    title: {
        defaultMessage: 'Advanced Settings',
        description: 'Title of settings modal',
        id: 'tw.settingsModal.title'
    },
    help: {
        defaultMessage: 'Click for help',
        description: 'Hover text of help icon in settings',
        id: 'tw.stetingsModal.help'
    }
});

const Setting = ({active, children}) => (
    <Box
        className={classNames(styles.setting, {
            [styles.active]: active
        })}
    >
        {children}
    </Box>
);
Setting.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node
};

class BooleanSetting extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickHelp'
        ]);
        this.state = {
            helpVisible: false
        };
    }
    componentDidUpdate (prevProps) {
        if (this.props.value && !prevProps.value) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                helpVisible: true
            });
        }
    }
    handleClickHelp () {
        this.setState(prevState => ({
            helpVisible: !prevState.helpVisible
        }));
    }
    render () {
        const {
            value,
            onChange,
            children
        } = this.props;
        const {helpVisible} = this.state;
        const childrenList = React.Children.toArray(children);
        const hasHelp = childrenList.length > 1;
        return (
            <Setting active={!!value}>
                <div className={styles.label}>
                    <label className={styles.label}>
                        <FancyCheckbox
                            type="checkbox"
                            className={styles.checkbox}
                            checked={value}
                            onChange={onChange}
                        />
                        {childrenList[0]}
                    </label>
                    {hasHelp && <button
                        className={styles.helpIcon}
                        onClick={this.handleClickHelp}
                        title={this.props.intl.formatMessage(messages.help)}
                    />}
                </div>
                {hasHelp && helpVisible && <div className={styles.detail}>
                    {childrenList[1]}
                </div>}
            </Setting>
        );
    }
}
BooleanSetting.propTypes = {
    intl: intlShape,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};
const WrappedBooleanSetting = injectIntl(BooleanSetting);

const HighQualityPen = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="High Quality Pen"
            description="High quality pen setting"
            id="tw.settingsModal.highQualityPen"
        />
        <div>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="High Quality Pen makes the pen layer dynamically increase in resolution to match the size it's displayed instead of always being 480×360, which can make pen projects appear smoother."
                    description="High quality pen setting help"
                    id="tw.settingsModal.highQualityPenHelp"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const Interpolation = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="Interpolation"
            description="Interpolation setting"
            id="tw.settingsModal.interpolation"
        />
        <div>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Interpolation is an experimental feature that makes project appear to run at higher framerates without changing their behavior. If you've ever run a project at 60 FPS and noticed that it's running too fast, that's the problem interpolation solves."
                    description="Interpolation setting help"
                    id="tw.settingsModal.interpolationHelp"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const RemoveLimits = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="Remove Limits (previously &quot;Infinite Clones&quot;)"
            description="Remove Limits setting"
            id="tw.settingsModal.removeLimits"
        />
        <div>
            <p>
                <FormattedMessage
                    defaultMessage="Disables the following limits: Clone limit, sprite fencing, and sound effect limits"
                    description="Remove Limits setting help"
                    id="tw.settingsModal.removeLimitsHelp"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const WarpTimer = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="Warp Timer"
            description="Warp Timer setting"
            id="tw.settingsModal.warpTimer"
        />
        <div>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Warp Timer makes scripts check to see if they are stuck in a long or infinite loop, and run at a low framerate (~2 fps) instead of getting completely stuck until the loop completes (if the loop ever finishes)."
                    description="Warp Timer help"
                    id="tw.settingsModal.warpTimerHelp"
                />
            </p>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="This has a performance impact (up to 3x slower in some cases), which is why it's not enabled by default."
                    description="Warp Timer help"
                    id="tw.settingsModal.warpTimerHelp2"
                />
            </p>
            <p>
                <FormattedMessage
                    defaultMessage="Automatically enabled when you open the editor."
                    description="Warp Timer help"
                    id="tw.settingsModal.warpTimerHelp3"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const DisableCompiler = props => (
    <WrappedBooleanSetting {...props}>
        <FormattedMessage
            defaultMessage="Disable Compiler"
            description="Disable Compiler setting"
            id="tw.settingsModal.disableCompiler"
        />
        <div>
            <p>
                <FormattedMessage
                    defaultMessage="Disables the TurboWarp compiler. You probably do not want to enable this."
                    description="Disable Compiler help"
                    id="tw.settingsModal.disableCompilerHelp"
                />
            </p>
        </div>
    </WrappedBooleanSetting>
);

const CustomStageSize = ({
    customStageSizeEnabled,
    stageWidth,
    onStageWidthChange,
    stageHeight,
    onStageHeightChange
}) => (
    <Setting active={customStageSizeEnabled}>
        <div className={classNames(styles.label, styles.customStageSize)}>
            <span>
                <FormattedMessage
                    defaultMessage="Custom Stage Size:"
                    description="Custom Stage Size option"
                    id="tw.settingsModal.customStageSize"
                />
            </span>
            <BufferedInput
                value={stageWidth}
                onSubmit={onStageWidthChange}
                type="number"
                min="0"
                max="4096"
                step="1"
            />
            <span>{'×'}</span>
            <BufferedInput
                value={stageHeight}
                onSubmit={onStageHeightChange}
                type="number"
                min="0"
                max="4096"
                step="1"
            />
        </div>
    </Setting>
);
CustomStageSize.propTypes = {
    customStageSizeEnabled: PropTypes.bool,
    stageWidth: PropTypes.number,
    onStageWidthChange: PropTypes.func,
    stageHeight: PropTypes.number,
    onStageHeightChange: PropTypes.func
};

const SettingsModalComponent = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onClose}
        contentLabel={props.intl.formatMessage(messages.title)}
        id="settingsModal"
    >
        <Box className={styles.body}>
            <HighQualityPen
                value={props.highQualityPen}
                onChange={props.onHighQualityPenChange}
            />
            <Interpolation
                value={props.interpolation}
                onChange={props.onInterpolationChange}
            />
            <RemoveLimits
                value={props.removeLimits}
                onChange={props.onRemoveLimitsChange}
            />
            <WarpTimer
                value={props.warpTimer}
                onChange={props.onWarpTimerChange}
            />
            <DisableCompiler
                value={props.disableCompiler}
                onChange={props.onDisableCompilerChange}
            />
            <CustomStageSize
                {...props}
            />
            {props.reloadRequired && <Box className={styles.info}>
                <p>
                    <FormattedMessage
                        defaultMessage="A reload is required to apply these settings."
                        description="Part of the settings modal"
                        id="tw.settingsModal.reloadRequired"
                    />
                </p>
            </Box>}
            <Box className={styles.info}>
                <p>
                    <FormattedMessage
                        defaultMessage="These settings will automatically be stored in the page URL. {additionalHelp}"
                        description="Part of the settings modal"
                        id="tw.settingsModal.url"
                        values={{
                            additionalHelp: (
                                <a
                                    href="https://github.com/TurboWarp/scratch-gui/wiki/Advanced-Settings"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FormattedMessage
                                        defaultMessage="Additional help"
                                        description="Link to advanced settings on the wiki"
                                        id="tw.settingsModal.moreHelp"
                                    />
                                </a>
                            )
                        }}
                    />
                </p>
            </Box>
        </Box>
    </Modal>
);

SettingsModalComponent.propTypes = {
    intl: intlShape,
    onClose: PropTypes.func,
    reloadRequired: PropTypes.bool,
    highQualityPen: PropTypes.bool,
    onHighQualityPenChange: PropTypes.func,
    interpolation: PropTypes.bool,
    onInterpolationChange: PropTypes.func,
    removeLimits: PropTypes.bool,
    onRemoveLimitsChange: PropTypes.func,
    warpTimer: PropTypes.bool,
    onWarpTimerChange: PropTypes.func,
    disableCompiler: PropTypes.bool,
    onDisableCompilerChange: PropTypes.func
};

export default injectIntl(SettingsModalComponent);
