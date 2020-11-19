import React from 'react'


const FormUser = ({ handleSubmit}) => (
    <div className=" container">
        <form onSubmit={handleSubmit}>
            <div className="input-data">
                <input type="text" name="username" required/>
            </div>
            <button className="btn btn-warning" id="button" type="submit" value="Find user !"> Find user !</button>
        </form>
    </div>
)

export default FormUser