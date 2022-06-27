import React from 'react';
import Dropdown from './Components/Dropdown';

const Home = () => {

    let optionInput = [{ "title": "React", "id": "react" }, {
        "title":
            "Angular", "id": "angular"
    }, { "title": "Vue", "id": "vue" }, {
        "title":
            "Ember", "id": "ember"
    }]
    let colors = ['red', 'yellow', 'green', 'blue'];
    return (
        <div className='container'><h4 className='text-center mt-5 pt-5'> Here is the custom dropdown</h4>
            <div className=' d-flex justify-content-center login-form-container w-100'>
                <div className='mt-5'>
                    <h4>Dropdown with array object </h4>
                    <Dropdown optionInput={optionInput} />
                </div>
                <div className='mt-5'>
                    <h4>Dropdown with simple array </h4>
                    <Dropdown optionInput={colors} />
                </div>

            </div>
        </div>
    );
};

export default React.memo(Home);