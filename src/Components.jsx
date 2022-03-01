import { Component } from 'react';
import './index.css';

export class ChooseSize extends Component {
    render() {
        const numWords = [12, 24]
        const options = numWords.map((num, index) => {
            return <option key={index} value={num}>{num}</option>
        })
        return (
            <div className="h-10">
                <label htmlFor='word_count'>{"# of words: "}</label>
                <select
                    className="m-5 rounded bg-slate-800"
                    id="word_count"
                    onChange={this.props.handleChange}>{options}
                </select>
            </div>
        )
    }
}

export const TextInput = (props) => {
    let textContent = props.words
        .filter(item => item.input)
        .map(item => item.input)
        .join(' ')
    if (props.appendSpace) textContent += ' ';
    const textPlaceholder = props.words.map(item => item.placeholder).join(' ');
    let styleClasses = "rounded w-full bg-slate-800 border "
    if (props.allWordsValid) {
        styleClasses += "border-green-600"
    } else {
        styleClasses += "border-orange-500"
    }
    return (
        <label className='block'>
            <span className='text-xs'>Mnemonic phrase</span>
            <textarea
                rows="7"
                cols="21"
                onChange={props.handleChange}
                className={styleClasses}
                value={textContent}
                placeholder={`e.g. "${textPlaceholder}"`} />
        </label>
    )
}


export const KeyInput = (props) => {
    let styleClasses = "block h-7 rounded border bg-slate-800 w-1/3 "
    if (props.number.isValid) {
        styleClasses += "border-green-600"
    } else {
        styleClasses += "border-orange-500"
    }

    return (
        <label className='block mt-10'>
            <span className="text-xs">Key</span>
            <input
                className={styleClasses}
                type="number"
                placeholder="e.g 13"
                onChange={props.handleChange}
                value={props.number.value} />
        </label>
    )
}

export const Launch = (props) => {
    return (
        <div className='flex'>
            <Button enabled={props.enabled} onClick={props.handleEncode} name="Encode" />
            <Button enabled={props.enabled} onClick={props.handleDecode} name="Decode" />
        </div>
    )
}

const Button = (props) => {
    if (props.enabled) {
        return (
            <button
                className='flex-1 m-5 px-2 py-2 bg-slate-800 text-slate-50 rounded-lg'
                onClick={props.onClick}
            >{props.name}</button>
        )
    } else {
        return (
            <button
                className='flex-1 m-5 px-2 py-2 border border-orange-600 bg-slate-800 text-gray-400 rounded-lg'
                disabled
            >{props.name}</button>
        )
    }

}

