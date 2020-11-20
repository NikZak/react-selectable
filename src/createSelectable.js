import React from 'react';
import PropTypes from 'prop-types';

const createSelectable = (WrappedComponent) => {
	class SelectableItem extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
    }

		componentDidMount () {
			// this.context.selectable.register(this.props.selectableKey, findDOMNode(this));
			this.context.selectable.register(this.props.selectableKey, this.wrapper.current);
		}

		componentWillUnmount () {
			this.context.selectable.unregister(this.props.selectableKey);
		}

		render () {
          return <div id={"selectableItem-"+this.props.selectableKey}>
            <WrappedComponent {...this.props} passwrapper={this.wrapper} >
              {this.props.children}
            </WrappedComponent>
          </div>
		}
	}

	SelectableItem.contextTypes = {
		selectable: PropTypes.object
	};

	SelectableItem.propTypes = {
		children: PropTypes.node,
		selectableKey: PropTypes.any.isRequired
	};

	return SelectableItem;
};

export default createSelectable;
