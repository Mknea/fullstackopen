import React from 'react'
const FilterForm = ( {textAbove, name, handler} ) => (
    <form>
        <div>{textAbove}</div>
        <div>
            <input value={name} onChange={handler}/>
        </div>
    </form>
)
export default FilterForm;