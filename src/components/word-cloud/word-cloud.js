import React from 'react';
import { connect } from 'react-redux';

import GeneratorForm from '../generator-form/generator-form';
// import {goEdit, downVoteCloud, upVoteCloud} from '../../actions/actions';
import {goEdit} from '../../actions/actions';
import TagCloud from 'react-tag-cloud';
import ReactWordCloud from 'react-wordcloud';
import randomColor from 'randomcolor';
import './word-cloud.css';

export class Wordcloud extends React.Component {

    onSubmit(event) {
        event.preventDefault();
        this.props.dispatch(goEdit());
      }

    render() {

        // const deduped = [...new Set(this.props.activeCloud.words)];

        // const words = deduped.map((word, index) => (
        //         <div key={index}>
        //             {word}
        //         </div>
        //   ));
        // const wordsArr = this.props.activeCloud.words;
        // const words = wordsArr.map((word, index) => (
        //     {word:{word}, value:{index}}
        // ));

        const cloudFontStyle = {
            fontFamily: this.props.activeCloud.font
        }

        const words = [
            {word: 'hello', value: 3},
            {word: 'world', value: 1},
            {word: 'github', value: 1},
            {word: 'code', value: 1},
          ];

        const WORD_COUNT_KEY = 'value';
        const WORD_KEY = 'word';

        return (
            <div className="word-cloud-outer">
                <div className='word-cloud-inner' style={cloudFontStyle}>
                    <div className="absolute-cloud-container" style={{width: 600, height: 400}}>
                    <ReactWordCloud
                        words={words}
                        wordCountKey={WORD_COUNT_KEY}
                        wordKey={WORD_KEY}
                    />
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
                    </div>
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
            </div>
        );
    }
}

const mapStateToProps = state => ({
    activeCloud: state.activeCloud,
    view: state.view
});
  
export default connect(mapStateToProps)(Wordcloud);