import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from '../hoc/Portal';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TOOLTIP } from '../identifiers.js';
import events from '../utils/events';
import utils from '../utils/utils';

const POSITION = {
  BOTTOM: 'bottom',
  HORIZONTAL: 'horizontal',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  VERTICAL: 'vertical'
};

const defaults = {
  className: '',
  delay: 0,
  hideOnClick: true,
  showOnClick: false,
  position: POSITION.VERTICAL,
  theme: {},
  hideOnHover: true,
  hideDelay: 0,
  tooltipClassName: ''
};

const tooltipFactory = (options = {}) => {
  const {
    className: defaultClassName,
    delay: defaultDelay,
    hideOnClick: defaultHideOnClick,
    showOnClick: defaultShowOnClick,
    position: defaultPosition,
    theme: defaultTheme,
    hideOnHover: defaultHideOnHover,
    hideDelay: defaultHideDelay,
    tooltipClassName: defaultTooltipClassName
  } = {...defaults, ...options};

  return ComposedComponent => {
    class TooltippedComponent extends Component {
      static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        theme: PropTypes.shape({
          tooltip: PropTypes.string,
          tooltipActive: PropTypes.string,
          tooltipWrapper: PropTypes.string
        }),
        tooltip: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.node
        ]),
        tooltipDelay: PropTypes.number,
        tooltipHideDelay: PropTypes.number,
        tooltipHideOnClick: PropTypes.bool,
        tooltipHideOnHover: PropTypes.bool,
        tooltipPosition: PropTypes.oneOf(Object.keys(POSITION).map(key => POSITION[key]))
      };

      static defaultProps = {
        className: defaultClassName,
        tooltipClassName: defaultTooltipClassName,
        tooltipDelay: defaultDelay,
        tooltipHideOnClick: defaultHideOnClick,
        tooltipPosition: defaultPosition,
        tooltipHideOnHover: defaultHideOnHover,
        tooltipHideDelay: defaultHideDelay,
        tooltipShowOnClick: defaultShowOnClick
      };

      state = {
        active: false,
        position: this.props.tooltipPosition,
        visible: false,
        tooltipHovered: false
      };

      componentWillUnmount () {
        if (this.refs.tooltip) {
          events.removeEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
        }
      }

      activate ({ top, left, position }) {
        if (this.timeout) clearTimeout(this.timeout);
        this.setState({ visible: true, position });
        this.timeout = setTimeout(() => {
          this.setState({ active: true, top, left });
        }, this.props.tooltipDelay);
      }

      deactivate () {
        if (this.timeout) clearTimeout(this.timeout);
        if (this.state.active) {
          if (this.refs && this.refs.tooltip) events.addEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
          this.setState({ active: false });
        } else if (this.state.visible) {
          this.setState({ visible: false });
        }
      }

      getPosition (element) {
        const { tooltipPosition } = this.props;
        if (tooltipPosition === POSITION.HORIZONTAL) {
          const origin = element.getBoundingClientRect();
          const { width: ww } = utils.getViewport();
          const toRight = origin.left < ((ww / 2) - origin.width / 2);
          return toRight ? POSITION.RIGHT : POSITION.LEFT;
        } else if (tooltipPosition === POSITION.VERTICAL) {
          const origin = element.getBoundingClientRect();
          const { height: wh } = utils.getViewport();
          const toBottom = origin.top < ((wh / 2) - origin.height / 2);
          return toBottom ? POSITION.BOTTOM : POSITION.TOP;
        } else {
          return tooltipPosition;
        }
      }

      calculatePosition (element) {
        const position = this.getPosition(element);
        const { top, left, height, width } = element.getBoundingClientRect();
        const xOffset = window.scrollX || window.pageXOffset;
        const yOffset = window.scrollY || window.pageYOffset;
        if (position === POSITION.BOTTOM) {
          return {
            top: top + height + yOffset,
            left: left + (width / 2) + xOffset,
            position
          };
        } else if (position === POSITION.TOP) {
          return {
            top: top + yOffset,
            left: left + (width / 2) + xOffset,
            position
          };
        } else if (position === POSITION.LEFT) {
          return {
            top: top + (height / 2) + yOffset,
            left: left + xOffset,
            position
          };
        } else if (position === POSITION.RIGHT) {
          return {
            top: top + (height / 2) + yOffset,
            left: left + width + xOffset,
            position
          };
        }
      }

      onTransformEnd = (e) => {
        if (e.propertyName === 'transform') {
          events.removeEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
          this.setState({ visible: false });
        }
      };

      handleMouseEnter = (event) => {
        this.activate(this.calculatePosition(event.currentTarget));
        if (this.props.onMouseEnter) this.props.onMouseEnter(event);
      };

      handleMouseLeave = (event) => {
        if (this.props.tooltipHideOnHover){
              this.deactivate();
        } else { // if we don't want to hide tooltip on hover
          // give timeout
          if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
          this.hoverTimeout = setTimeout(() => {
            if (!this.state.tooltipHovered){ //check if the mouse enterd the tooltip
              this.deactivate();
              }
            }, this.props.tooltipHideDelay);
        }

        if (this.props.onMouseLeave) this.props.onMouseLeave(event);
      };

      handleTooltipMouseEnter = (event) => {
        if (!this.props.tooltipHideOnHover){
          this.setState({tooltipHovered: true});
        }
      }

      handleTooltipMouseLeave = (event) => {
        if (!this.props.tooltipHideOnHover){
          this.setState({tooltipHovered: false}, ()=>{
            this.deactivate();
          });
        }
      }

      handleClick = (event) => {
        if (this.props.tooltipHideOnClick && this.state.active) {
            this.deactivate();
        }

        if (this.props.tooltipShowOnClick && !this.state.active) {
          this.activate(this.calculatePosition(event.currentTarget));
        }

        if (this.props.onClick) this.props.onClick(event);
      };

      render () {
        const { active, left, top, position, visible } = this.state;
        const positionClass = `tooltip${position.charAt(0).toUpperCase() + position.slice(1)}`;
        const {
          children,
          className,
          theme,
          tooltip,
          tooltipDelay,       //eslint-disable-line no-unused-vars
          tooltipHideOnClick, //eslint-disable-line no-unused-vars
          tooltipPosition,    //eslint-disable-line no-unused-vars
          tooltipHideOnHover, //eslint-disable-line no-unused-vars
          tooltipShowOnClick, //eslint-disable-line no-unused-vars
          tooltipClassName,
          ...other
        } = this.props;

        const _className = classnames(theme.tooltip, tooltipClassName, {
          [theme.tooltipActive]: active,
          [theme[positionClass]]: theme[positionClass]
        });

        const isNative = typeof ComposedComponent === 'string';

        return (
          <ComposedComponent
            {...other}
            className={className}
            onClick={this.handleClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            {...isNative ? {} : {theme}}
          >
            {children ? children : null}
            {visible && (
              <Portal>
                {tooltip !== null ? <span ref="tooltip" onMouseEnter={this.handleTooltipMouseEnter} onMouseLeave={this.handleTooltipMouseLeave} className={_className} data-react-toolbox="tooltip" style={{top, left}}>
                  <span className={theme.tooltipInner}>{tooltip}</span>
                </span> : null}
              </Portal>
            )}
          </ComposedComponent>
        );
      }
    }

    return themr(TOOLTIP, defaultTheme)(TooltippedComponent);
  };
};

export default tooltipFactory;
