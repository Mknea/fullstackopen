import React from 'react'
const FilterForm = ( {name, handler} ) => (
    <form>
        <div>filter shown with</div>
        <div>
            <input value={name} onChange={handler}/>
        </div>
    </form>
)
export default FilterForm;