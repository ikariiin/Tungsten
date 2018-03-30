import React, { Component } from 'react';
import {Dialog, DropDownMenu, FlatButton, MenuItem, MuiThemeProvider} from "material-ui";
import brace from 'brace';
import AceEditor from 'react-ace';

// Pls dun h8 me.
import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/coffee';
import 'brace/mode/csharp';
import 'brace/mode/golang';
import 'brace/mode/handlebars';
import 'brace/mode/json';
import 'brace/mode/html';
import 'brace/mode/mysql';
import 'brace/mode/markdown';
import 'brace/mode/sass';
import 'brace/mode/ruby';
import 'brace/mode/xml';
import 'brace/mode/python';
import 'brace/mode/java';

import 'brace/theme/tomorrow';
import 'brace/ext/language_tools';

export default class CodeEditorDialog extends Component {
    actions = [];
    state = {
        open: true,
        mode: 'javascript',
        code: ''
    };

    languageModes = [
        <MenuItem key={0} primaryText='JavaScript' value='javascript' />,
        <MenuItem key={1} primaryText='Java' value='java' />,
        <MenuItem key={2} primaryText='Python' value='python' />,
        <MenuItem key={3} primaryText='XML' value='xml' />,
        <MenuItem key={4} primaryText='Ruby' value='ruby' />,
        <MenuItem key={5} primaryText='SASS' value='sass' />,
        <MenuItem key={6} primaryText='MarkDown' value='markdown' />,
        <MenuItem key={7} primaryText='MySQL' value='mysql' />,
        <MenuItem key={8} primaryText='JSON' value='json' />,
        <MenuItem key={9} primaryText='HTML' value='html' />,
        <MenuItem key={10} primaryText='HandleBars' value='handlebars' />,
        <MenuItem key={11} primaryText='GoLang' value='golang' />,
        <MenuItem key={12} primaryText='C#' value='csharp' />,
        <MenuItem key={13} primaryText='CoffeeScript' value='coffee' />,
        <MenuItem key={14} primaryText='CSS' value='css' />,
    ];

    componentWillMount() {
        this.actions = [
            <FlatButton
                label='Cancel'
                onClick={this.handleClose}
            />,
            <FlatButton
                label='Send'
                primary={true}
                onClick={this.handleCompletion}
            />
        ]
    }

    handleCompletion = ev => {
        this.props.handleEditorCompletion({
            value: this.state.code
        });
    };

    handleClose = ev => {
        this.setState(prevState => ({
            ...prevState,
            open: false
        }));
        setTimeout(_ => this.props.handleDialogClose(), 1000);
    };

    handleModeChange = (event, index, value) => {
        this.setState(prevState => ({
            ...prevState,
            mode: value
        }));
    };

    onChange = value => {
        this.setState(prevState => {
            return {
                ...prevState,
                code: value
            }
        });
    };

    render() {
        return (
            <MuiThemeProvider>
                <Dialog
                    title='Code Editor'
                    actions={this.actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <DropDownMenu
                        value={this.state.mode}
                        onChange={this.handleModeChange}
                        style={ {width: '100%'} }
                        autoWidth={false}
                    >
                        { this.languageModes }
                    </DropDownMenu>
                    <AceEditor
                        mode={this.state.mode}
                        theme={'tomorrow'}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlisghActiveLine={true}
                        editorProps={{$blockScrolling: Infinity}}
                        enableBasicAutocompletion={true}
                        enableLiveAutocompletion={true}
                        name='code-editor'
                        value={this.state.code}
                        onChange={this.onChange}
                        focus={true}
                        width='100%'
                        setOptions={ {
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            showLineNumbers: true,
                            tabSize: 4
                        } }
                    />
                </Dialog>
            </MuiThemeProvider>
        );
    }
};