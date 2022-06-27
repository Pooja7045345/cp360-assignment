import React, { useState, useEffect } from 'react';
import { formateOption, selectedOptionHandler } from './../Helpers/Helpers';
const Dropdown = ({ optionInput }) => {
    const [optionHideShow, setOptionHideShow] = useState(false);
    const [searchable, setSearchable] = useState(false);
    const [multiSelect, setMultiSelect] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);
    const [optionsList, setOptionList] = useState([]);
    const [filterOption, setFilterOption] = useState();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [tempSelected, setTempSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    useEffect(() => {
        const filteredData = formateOption(optionInput).filter((el) => {
            return el.title.toLowerCase().includes(filterOption)
        })
        setOptionList(filteredData);
    }, [filterOption, optionInput ]);

    useEffect(() => {
        if (optionInput.length !== 0) {
            let formattedOption = formateOption(optionInput);
            let final_value = formattedOption.map((val) => ({ ...val, checked: 0 }));
            setOptionList(final_value)
        }

    }, [optionInput])
    useEffect(() => {
        if (multiSelect === false) {
            singleSelectHandler();
        } else {
            multipleSelectHandler()
        }
    }, [selectOptions]);

    const singleSelectHandler = () => {
        if (selectOptions.length !== 0) {
            setSelectedOptions([selectOptions]);
            setOptionHideShow(false)
        }
    }

    const searchableHandler = (target) => {
        if (target.checked === true) {
            setSearchable(true)
        } else {
            setSearchable(false)
        }
    }
    const multiSelectHandler = (target) => {
        if (target.checked === true) {
            setMultiSelect(true)
        } else {
            setMultiSelect(false)
        }
    }

    const multipleSelectHandler = () => {
        if (selectOptions.length !== 0) {

        }
    }
    const optionListUpdate = (selected) => {
        let final = optionsList.map(value => {
            if (value.id === selected.id) {
                return ({ ...value, checked: 1 });
            } else {
                return ({ ...value });
            }
        })
        setOptionList(final);
        setTempSelected(prev => [...prev, selected]);

    }

    const removeOptionUpdate = (selected) => {
        let final = optionsList.map(value => {
            if (value.id === selected.id) {
                return ({ ...value, checked: 0 });
            } else {
                return ({ ...value });
            }
        })
        let finalOption = tempSelected.filter(value => value.title !== selected.title);
        setTempSelected(finalOption)
        setOptionList(final);
    }
    useEffect(() => {
        if (tempSelected.length !== 0) {
            if (tempSelected.length === optionsList.length) {
                setIsAllSelected(true)
            } else {
                setIsAllSelected(false)
            }
        } else {
            setIsAllSelected(false)
        }

    }, [tempSelected])
    const onSubmitShowDataMultiSelect = () => {
        setSelectedOptions(tempSelected);
    }

    const selectAll = () => {
        let final = optionsList.map(value => ({ ...value, checked: 1 }))
        setOptionList(final);
        setTempSelected(final)
        setIsAllSelected(true)
    }
    const deselectAll = () => {
        let final = optionsList.map(value => ({ ...value, checked: 0 }))
        setOptionList(final);
        setTempSelected([])
        setIsAllSelected(false)
    }

    const reset = () => {
        let final = optionsList.map(value => ({ ...value, checked: 0 }))
        setOptionList(final);
        setTempSelected([])
        setIsAllSelected(false)
        setSelectedOptions([])
    }
    return (

        <div className='dropdown-container'>
            <div className='dropdown-actions-container'>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="multiSelect" onChange={(e) => multiSelectHandler(e.target)} />
                    <label className="custom-control-label" htmlFor="multiSelect">Multi select</label>
                </div>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="searchable" onChange={(e) => searchableHandler(e.target)} />
                    <label className="custom-control-label" htmlFor="searchable" >Searchable</label>
                </div>
            </div>
            <div className='dropdown-selected-input' onClick={() => setOptionHideShow(!optionHideShow)}>
                <p className='m-0'> {selectedOptions.length !== 0 ? selectedOptionHandler(selectedOptions) : 'Select Value'}</p>
                <div>
                    {
                        optionHideShow === false ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                            </svg>}
                </div>
            </div>
            {
                optionHideShow ?
                    <div className='dropdown-list-container'>
                        {searchable ? <input type='search' onChange={(e) => setFilterOption(e.target.value)} className='search-action-input' placeholder='Type to search' /> : ''}
                        {multiSelect && searchable === false ? <div><input type='checkbox' value='all' onChange={(e) => { e.target.checked ? selectAll() : deselectAll() }} style={{ display: multiSelect ? 'block' : 'none' }} checked={isAllSelected} /> Select All </div> : ''}
                        {
                            optionsList.length !== 0 ? optionsList.map((option, i) => {
                                return <div key={i} onClick={() => multiSelect === false ? setSelectOptions(option) : ''}><input type='checkbox' onChange={(e) => { setSelectOptions(option); e.target.checked ? optionListUpdate(option) : removeOptionUpdate(option) }} checked={option.checked === 1 ? true : false} value={option.title} style={{ display: multiSelect ? 'block' : 'none' }} /> {option.title}</div>
                            })
                                : <p className='small text-center'>No Results Available</p>
                        }
                        {multiSelect ? <div className='d-flex justify-content-between mt-4 mb-3'> <button className='btn btn-success' onClick={onSubmitShowDataMultiSelect}>Submit</button> <button className='btn btn-danger' onClick={reset}>Reset</button></div> : ''}
                    </div> : ''
            }

        </div>
    );
};

export default React.memo(Dropdown);