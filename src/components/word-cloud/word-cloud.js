import React from 'react';
import { connect } from 'react-redux';

import GeneratorForm from '../generator-form/generator-form';
// import {goEdit, downVoteCloud, upVoteCloud} from '../../actions/actions';
import {goEdit} from '../../actions/actions';
// import TagCloud from 'react-tag-cloud';
import ResizeAware from 'react-resize-aware';
import ReactWordCloud from 'react-wordcloud';
import randomColor from 'randomcolor';
import './word-cloud.css';

export class Wordcloud extends React.Component {

    onSubmit(event) {
        event.preventDefault();
        this.props.dispatch(goEdit());
      }

    generateWordsArray(words) {
        const returnArr = [];
        let index;
        for (let i = 0; i < words.length; i++) {
            index = returnArr.findIndex(element => element.word === words[i]);
            if (index !== -1) {
                returnArr[index].value++;
            } else {
                returnArr.push({word:words[i], value:1});
            }
        }
        return returnArr;
    }

    generateColorArray(color) {

        return randomColor({
            count: 10,
            hue: color
        });

    }

    render() {

        // const deduped = [...new Set(this.props.activeCloud.words)];

        // const words = deduped.map((word, index) => (
        //         <div key={index}>
        //             {word}
        //         </div>
        //   ));

        // const cloudFontStyle = {
        //     fontFamily: this.props.activeCloud.font
        // }

        const words = this.generateWordsArray(this.props.activeCloud.words);
        const colors = this.generateColorArray(this.props.activeCloud.color);

        const WORD_COUNT_KEY = 'value';
        const WORD_KEY = 'word';

        return (
            <div className='word-cloud-wrapper'>
                <ResizeAware>
                    { size => {
                        const width = size.width || 1280; // 800 default width
                        // const height = Math.min(width / 21 * 9, 548); // 500 4:3 ratio
                        const height = 600;
                        return (
                            <ReactWordCloud
                                colors={colors}
                                fontFamily={this.props.activeCloud.font}
                                words={words}
                                wordCountKey={WORD_COUNT_KEY}
                                wordKey={WORD_KEY}
                                height= {height}
                                width={width}
                            />
                        );
                    }}
                </ResizeAware>
                            {/* <TagCloud 
                                className="tag-cloud"
                                style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                                fontFamily: this.props.activeCloud.font,
                                color: () => randomColor({
                                    hue: this.props.activeCloud.color
                                }),
                                padding: 5
                                }}>
                                {words}
                            </TagCloud> */}
                {this.props.view === 'focus' && <div className="edit-form">
                    <form onSubmit={(event) => this.onSubmit(event)}>
                        <button type="submit" name="submit" id="editWordCloud" className="button">
                            Edit Word Cloud
                        </button>
                    </form>
                </div>}
                {this.props.view === 'cloudEdit' && <div className="edit-form">
                    <GeneratorForm />
                </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeCloud: state.activeCloud,
    view: state.view
});
  
export default connect(mapStateToProps)(Wordcloud);