import { Component } from 'react';
import { ethers } from 'ethers';

// custom components
import { TextInput, ChooseSize, Launch, KeyInput } from './Components';

// custom functions for modulus math
import { isRelativePrime, getEncoded, getDecoded } from './helpers.js';

// fontawesome (icon)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import WebFont from 'webfontloader';

library.add(fab)
WebFont.load({
    google: {
        families: ['Pacifico:400']
    }
})

document.body.classList.add('bg-slate-900');

class App extends Component {
    constructor() {
        super();
        const initialNumWords = 12;
        const wordlist = ethers.wordlists.en;
        const initalWords = Array(12).fill(0).map(_ => {
            const randomIndex = Math.floor(Math.random() * 2048);
            return { input: "", isValid: false, placeholder: wordlist.getWord(randomIndex) }
        })

        this.initialState = {
            numWords: initialNumWords,
            words: initalWords,
            wordlist: wordlist,
            lastInputIsSpace: false,
            key: { value: "", isValid: false }
        }

        this.state = this.initialState
    }


    handleWordCountChange = (event) => {
        const { value } = event.target
        // no need for error handling, value can only be an int coming from our options
        const numWords = parseInt(value)
        const words = Array(numWords).fill(0).map(_ => {
            const randomIndex = Math.floor(Math.random() * 2048);
            return { input: "", isValid: false, placeholder: this.state.wordlist.getWord(randomIndex) }
        })

        this.setState({
            numWords: numWords,
            words: words,
            lastInputIsSpace: false
        })
    }


    handleWordInputChange = (event, index) => {
        const { words } = this.state
        const word = event.target.value.trim()
        words[index] = { input: word, isValid: this.state.wordlist.getWordIndex(word) > -1, placeholder: words[index].placeholder }
        this.setState({
            words: words
        })
    }


    handleTextInputChange = (event) => {
        const { words } = this.state;
        const newWords = event.target.value.split(' ');
        for (let index = 0; index < words.length; index++) {
            if (index < newWords.length) {
                words[index] = {
                    input: newWords[index],
                    isValid: this.state.wordlist.getWordIndex(newWords[index]) > -1,
                    placeholder: words[index].placeholder
                };
            } else {
                words[index] = {
                    input: "",
                    isValid: false,
                    placeholder: words[index].placeholder
                }
            }
        }
        const textInputLength = event.target.value.length;
        this.setState({
            words: words,
            lastInputIsSpace: event.target.value[textInputLength - 1] === ' '
        })
    }

    handleKeyInputChange = (event) => {
        let key;
        try {
            const keyValue = parseInt(event.target.value);
            key = { value: keyValue, isValid: isRelativePrime(keyValue) }
        } catch (e) {
            key = { value: event.target.value, isValid: false }
        }
        this.setState({
            key: key
        })
    }

    encode = () => getEncoded(this.state.words.map(item => item.input), this.state.key.value, this.state.wordlist);
    decode = () => getDecoded(this.state.words.map(item => item.input), this.state.key.value, this.state.wordlist);

    handleEncodeDecode = (event, isEncode) => {
        event.preventDefault()
        const { words } = this.state;
        const oldPlaceholders = words.map(item => item.placeholder);
        let newWords;
        if (isEncode) {
            newWords = this.encode();
        } else {
            newWords = this.decode();
        }

        this.setState({
            words: newWords.map((word, i) => {
                return { input: word, isValid: true, placeholder: oldPlaceholders[i] };
            })
        })
    }

    render() {
        const allWordsValid = this.state.words.every(item => item.isValid)
        return (
            <div className="bg-slate-900 py-10">
                <div className="m-auto px-8 w-80 bg-slate-700 rounded-xl shadow-lg font-mono text-slate-300" >
                    <p className="text-4xl text-center font-['Pacifico'] pt-10 pb-2">
                        milkshake.tools
                    </p>
                    <hr className="pb-5" />
                    <form className="space-y-2">
                        <ChooseSize
                            handleChange={this.handleWordCountChange}
                            numWords={this.state.numWords} />
                        <TextInput
                            wordlist={this.state.wordlist}
                            words={this.state.words}
                            appendSpace={this.state.lastInputIsSpace}
                            handleChange={this.handleTextInputChange}
                            allWordsValid={allWordsValid} />
                        <KeyInput
                            handleChange={this.handleKeyInputChange}
                            number={this.state.key} />
                        <Launch
                            enabled={allWordsValid && this.state.key.isValid}
                            handleEncode={(event) => this.handleEncodeDecode(event, true)}
                            handleDecode={(event) => this.handleEncodeDecode(event, false)}
                        />
                    </form>
                </div>
                <div className="flex w-80 m-auto my-5">
                    <a className="m-auto self-center text-4xl text-slate-700" href='https://github.com/crnch/milkshake.tools'>
                        <FontAwesomeIcon icon="fa-brands fa-github-alt" /></a>
                </div>
            </div>
        );
    }
}

export default App;
