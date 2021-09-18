import React, { useEffect, useState, useRef } from 'react'

const autoComplete = (val, sug, max = 7) => {

    const startArr = [];
    // const includsArr = [];
    const exactArr = [];

    sug.forEach(s => {
        const start = s.startsWith(val)
        // const include = s.includes(val)
        const exact = s === val
        if (exact) exactArr.push(s)
        else if (start) startArr.push(s)
        // else if (include) includsArr.push(s)
    })
    const newArr = [...exactArr, ...startArr]
    const maxArr = newArr.slice(0, max)
    return maxArr;

}

const Row = ({ reference, i, s, suggestionStyleHover, suggestionStyle, setVal }) => {

    const [hover, setHover] = useState(false)
    const sugestionsRef = useRef()

    return (
        <li
            ref={sugestionsRef}
            style={(hover || (reference === i)) ? { ...suggestionStyleHover, listStyle: 'none', cursor: 'pointer' } : { ...suggestionStyle, listStyle: 'none', cursor: 'pointer', zIndex: 100000 }}
            onMouseDown={(e) => setVal(s)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >{s}</li>
    )
}


function InputAutoComplete({ data, onChange, placeHolder, stylesInput, max }) {
    const [val, setVal] = useState('')
    const [sugestions, setSugestions] = useState([])
    const inputRef = useRef()
    const [reference, setReference] = useState(0)
    const { containerStyle, inputStyle, autoBoxStyle, suggestionStyleHover, suggestionStyle } = stylesInput;
    useEffect(() => {

        const div = inputRef.current;
        const walk = (e) => {
            const code = e.keyCode;
            if (code === 40) {
                setReference(prev => prev < sugestions.length - 1 ? prev + 1 : 0)
            } else if (code === 38) {
                setReference(prev => prev > 0 ? prev - 1 : 0)
            } else if (code === 13) {
                e.preventDefault()
                setVal(sugestions[reference])
                setSugestions([])
            }
        }

        div.addEventListener('keydown', walk)
        return () => {
            div.removeEventListener('keydown', walk)
        }
    }, [sugestions, reference])

    const hanleFocus = (e) => {
        const target = e.target.value;
        if (target == '') return setSugestions([]);
        const test = autoComplete(target, data, 5)
        setSugestions(test)
    }

    const handleChange = (e) => {
        const target = e.target.value;
        const test = autoComplete(target, data, max)
        setSugestions(test);
        setVal(target)
        onChange()
        if (target === '') return setSugestions([])

    }
    return (
        <div style={{ ...containerStyle }}>
            <input
                value={val}
                ref={inputRef}
                style={inputStyle}
                onChange={e => handleChange(e)}
                onBlur={() => setSugestions([])}
                onFocus={(e) => hanleFocus(e)}
                type="text"
                placeholder={placeHolder}
            />
            {sugestions.length > 0 &&
                <ul style={{ position: 'absolute', display: 'flex', flexDirection: 'column', top: inputRef.current.offsetHeight, width: '100%', margin: 0, padding: 0, ...autoBoxStyle }}>
                    {sugestions.map((s, i) => {
                        return <Row reference={reference} key={i} s={s} i={i} suggestionStyleHover={suggestionStyleHover} suggestionStyle={suggestionStyle} setVal={setVal} />
                    })}
                </ul>}
        </div>
    )
}

export default InputAutoComplete
