import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';
import { WanderingCubes } from 'better-react-spinkit';

import calculateFrequentPhrases from '../FrequentWords';

class FrequentWords extends Component {
    constructor() {
        super();
        this.state = {
            error: '',
            spinnerVisible: false,
            topPhrases: [],
            frequentPhrases: {}
        };
        this.onDrop = this.onDrop.bind(this);
        this.onParseComplete = this.onParseComplete.bind(this);
    }

    onParseComplete(results, file) {
        const { phrasesSorted, frequentPhrases } = calculateFrequentPhrases(results);
        this.setState({ topPhrases: phrasesSorted, frequentPhrases, spinnerVisible: false });
    }

    onDrop(file) {
        this.setState({
            spinnerVisible: true
        });
        const reader = new FileReader();
        reader.onload = () => {
            this.onParseComplete(reader.result, file);
        };
        reader.onerror = (err) => {
            this.setState({ err: 'Whoops! An error occurred'})
        };
        reader.readAsText(file[0]);
    }

    render() {
        const errWarning = this.state.error !== '' ? (
            <Alert bsStyle='warning'>
                <strong>Error!</strong> {this.state.error}
            </Alert>
        ) : null;
        const spinner = this.state.spinnerVisible ? (
            <WanderingCubes />
        ) : null;
        const phrasesList = _.map(this.state.topPhrases, phrase => (
            <div>
                {phrase}: {this.state.frequentPhrases[phrase]}
                <br />
            </div>
        ));
        return (
            <div>
                <div className="UVVisContainer">
                    {errWarning}
                    <Dropzone
                        onDrop={this.onDrop}
                        accept="text/plain"
                        className="UVVisDropZone"
                        activeClassName="UVVisDropZoneActive"
                        rejectClassName="UVVisDropZoneReject"
                    >
                        <div>Drop your .txt file here or click to select a file to upload!</div>
                        <div id="spinnerWrapper">
                            <div id="spinnerItem">
                                {spinner}
                            </div>
                        </div>
                    </Dropzone>
                    <br />
                </div>
                {phrasesList.length > 0 ? 'Phrases Found!' : null}
                {phrasesList}
            </div>
        );
    }
}

export default FrequentWords;
