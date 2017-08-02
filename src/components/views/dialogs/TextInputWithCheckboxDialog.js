/*
Copyright 2015, 2016 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import sdk from '../../../index';
import { _t } from '../../../languageHandler';

export default React.createClass({
    displayName: 'TextInputWithCheckboxDialog',
    propTypes: {
        title: React.PropTypes.string,
        description: React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.string,
        ]),
        value: React.PropTypes.string,
        button: React.PropTypes.string,
        focus: React.PropTypes.bool,
        checkLabel: React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.string,
        ]),
        check: React.PropTypes.bool,
        onFinished: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            title: "",
            value: "",
            description: "",
            focus: true,
            checkLabel: "",
            check: false,
        };
    },

    componentDidMount: function() {
        if (this.props.focus) {
            // Set the cursor at the end of the text input
            this.refs.textinput.value = this.props.value;
        }
    },

    onOk: function() {
        this.props.onFinished(true, this.refs.textinput.value, this.refs.checkbox.checked);
    },

    onCancel: function() {
        this.props.onFinished(false);
    },

    render: function() {
        const BaseDialog = sdk.getComponent('views.dialogs.BaseDialog');
        return (
            <BaseDialog className="mx_TextInputWithCheckboxDialog" onFinished={this.props.onFinished}
                onEnterPressed={this.onOk}
                title={this.props.title}
            >
                <div className="mx_Dialog_content">
                    <div className="mx_TextInputWithCheckboxDialog_label">
                        <label htmlFor="textinput"> {this.props.description} </label>
                    </div>
                    <div>
                        <input id="textinput" ref="textinput" className="mx_TextInputWithCheckboxDialog_input" defaultValue={this.props.value} autoFocus={this.props.focus} size="64" onKeyDown={this.onKeyDown}/>
                    </div>
                    <br/>
                    <label>
                        <input type="checkbox" id="checkbox" ref="checkbox" defaultChecked={this.props.check}/>
                        {this.props.checkLabel}
                    </label>
                </div>
                <div className="mx_Dialog_buttons">
                    <button onClick={this.onCancel}>
                        { _t("Cancel") }
                    </button>
                    <button className="mx_Dialog_primary" onClick={this.onOk}>
                        {this.props.button}
                    </button>
                </div>
            </BaseDialog>
        );
    },
});
