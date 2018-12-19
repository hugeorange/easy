import React from 'react';

const getDisplayName = component => component.displayName || component.name || 'Component';

export default (WrappedComponent, title = '默认标题') => class HOC extends React.Component {
    // 为高阶组件在react插件中命名
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
    render() {
        const newProps = {
            id: Math.random().toString(36).substring(2).toUpperCase()
        };
        
        return (
            <fieldset>
                <legend>{title}</legend>
                <WrappedComponent {...this.props} {...newProps} />
            </fieldset>
        )
    }
}